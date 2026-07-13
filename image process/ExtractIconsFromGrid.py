import cv2
import numpy as np
import os
from pathlib import Path


def extract_icons_from_grid(
    image_path: str,
    output_dir: str = "extracted_icons",
    min_frame_area: int = 500,
    max_frame_area: int | None = None,
    frame_color_threshold: int = 50,
    padding: int = 0,
) -> list[str]:
    """
    Detect black rectangular frames in a grid image and extract the interior
    content of each frame as individual image files.

    Args:
        image_path:             Path to the source grid image.
        output_dir:             Directory where extracted icons will be saved.
        min_frame_area:         Minimum contour area to consider as a frame.
        max_frame_area:         Maximum contour area (None = no upper limit).
        frame_color_threshold:  Pixels darker than this value (0-255) are
                                treated as part of a black frame.
        padding:                Extra pixels to trim inside the detected frame
                                boundary (positive = trim more, negative = keep
                                a sliver of frame).

    Returns:
        List of file paths for every saved icon, ordered top-to-bottom,
        left-to-right.
    """
    image_path = Path(image_path)
    if not image_path.exists():
        raise FileNotFoundError(f"Image not found: {image_path}")

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # ------------------------------------------------------------------ #
    # 1. Load image
    # ------------------------------------------------------------------ #
    src = cv2.imread(str(image_path))
    if src is None:
        raise ValueError(f"OpenCV could not read the image: {image_path}")

    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)

    # ------------------------------------------------------------------ #
    # 2. Isolate black frame pixels
    #    Threshold: pixels darker than `frame_color_threshold` → white (255),
    #    everything else → black (0).  This gives us a binary mask of the
    #    dark frame lines we want to detect.
    # ------------------------------------------------------------------ #
    _, dark_mask = cv2.threshold(
        gray, frame_color_threshold, 255, cv2.THRESH_BINARY_INV
    )

    # Light morphological closing to bridge tiny gaps in frame lines
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    dark_mask = cv2.morphologyEx(dark_mask, cv2.MORPH_CLOSE, kernel)

    # ------------------------------------------------------------------ #
    # 3. Find contours of the dark regions
    # ------------------------------------------------------------------ #
    contours, hierarchy = cv2.findContours(
        dark_mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE
    )

    if not contours:
        print("No contours found. Check `frame_color_threshold`.")
        return []

    # ------------------------------------------------------------------ #
    # 4. Filter contours that look like rectangular frames
    #    Criteria:
    #      - Area within [min_frame_area, max_frame_area]
    #      - Approximated polygon has 4 vertices (rectangle-like)
    #      - Aspect ratio between 0.2 and 5.0 (not degenerate)
    # ------------------------------------------------------------------ #
    frame_boxes: list[tuple[int, int, int, int]] = []

    img_h, img_w = src.shape[:2]
    if max_frame_area is None:
        max_frame_area = img_h * img_w  # whole image upper bound

    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area < min_frame_area or area > max_frame_area:
            continue

        peri = cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, 0.02 * peri, True)

        # Accept quadrilaterals (and near-quadrilaterals ≈ 4-6 vertices for
        # slightly rounded corners)
        if not (4 <= len(approx) <= 6):
            continue

        x, y, w, h = cv2.boundingRect(cnt)
        aspect = w / h if h else 0
        if not (0.2 <= aspect <= 5.0):
            continue

        frame_boxes.append((x, y, w, h))

    if not frame_boxes:
        print(
            "No rectangular frames detected. "
            "Try adjusting `min_frame_area` or `frame_color_threshold`."
        )
        return []

    # ------------------------------------------------------------------ #
    # 5. De-duplicate overlapping boxes (keep the outermost / largest box
    #    when two boxes share >50 % of their area — handles nested contours)
    # ------------------------------------------------------------------ #
    frame_boxes = _deduplicate_boxes(frame_boxes, overlap_threshold=0.5)

    # ------------------------------------------------------------------ #
    # 6. Sort boxes top-to-bottom, left-to-right (reading order)
    #    Rows are grouped by y-coordinate proximity (within half a cell height)
    # ------------------------------------------------------------------ #
    frame_boxes = _sort_boxes(frame_boxes)

    # ------------------------------------------------------------------ #
    # 7. For each frame, find the interior white region and crop it
    # ------------------------------------------------------------------ #
    stem = image_path.stem
    saved_paths: list[str] = []

    for idx, (fx, fy, fw, fh) in enumerate(frame_boxes, start=1):
        interior = _extract_interior(
            src, gray, fx, fy, fw, fh,
            frame_color_threshold, padding
        )
        if interior is None or interior.size == 0:
            print(f"  [frame {idx}] Empty interior — skipped.")
            continue

        out_file = output_path / f"{stem}_icon_{idx:03d}.png"
        cv2.imwrite(str(out_file), interior)
        saved_paths.append(str(out_file))
        print(f"  Saved icon {idx:>3d}: {out_file.name}  "
              f"({interior.shape[1]}×{interior.shape[0]} px)")

    print(f"\nDone. {len(saved_paths)} icon(s) saved to '{output_path}/'.")
    return saved_paths


# ======================================================================== #
# Helper functions
# ======================================================================== #

def _iou(a: tuple[int, int, int, int],
         b: tuple[int, int, int, int]) -> float:
    """Intersection-over-Union for two (x, y, w, h) boxes."""
    ax1, ay1 = a[0], a[1]
    ax2, ay2 = a[0] + a[2], a[1] + a[3]
    bx1, by1 = b[0], b[1]
    bx2, by2 = b[0] + b[2], b[1] + b[3]

    inter_x = max(0, min(ax2, bx2) - max(ax1, bx1))
    inter_y = max(0, min(ay2, by2) - max(ay1, by1))
    inter_area = inter_x * inter_y

    area_a = a[2] * a[3]
    area_b = b[2] * b[3]
    union_area = area_a + area_b - inter_area
    return inter_area / union_area if union_area else 0.0


def _deduplicate_boxes(
    boxes: list[tuple[int, int, int, int]],
    overlap_threshold: float = 0.5,
) -> list[tuple[int, int, int, int]]:
    """Remove duplicate / nested boxes using a greedy NMS-style pass."""
    # Sort largest first so outer frames survive
    boxes = sorted(boxes, key=lambda b: b[2] * b[3], reverse=True)
    kept: list[tuple[int, int, int, int]] = []

    for box in boxes:
        if all(_iou(box, k) < overlap_threshold for k in kept):
            kept.append(box)

    return kept


def _sort_boxes(
    boxes: list[tuple[int, int, int, int]],
) -> list[tuple[int, int, int, int]]:
    """Sort boxes in reading order: top-to-bottom row, then left-to-right."""
    if not boxes:
        return boxes

    avg_h = np.mean([b[3] for b in boxes])
    row_tol = avg_h * 0.5  # boxes within this vertical distance → same row

    rows: list[list[tuple[int, int, int, int]]] = []
    for box in sorted(boxes, key=lambda b: b[1]):  # primary sort by y
        placed = False
        for row in rows:
            if abs(box[1] - row[0][1]) < row_tol:
                row.append(box)
                placed = True
                break
        if not placed:
            rows.append([box])

    sorted_boxes: list[tuple[int, int, int, int]] = []
    for row in rows:
        sorted_boxes.extend(sorted(row, key=lambda b: b[0]))  # sort by x

    return sorted_boxes


def _extract_interior(
    src: np.ndarray,
    gray: np.ndarray,
    fx: int, fy: int, fw: int, fh: int,
    threshold: int,
    padding: int,
) -> np.ndarray | None:
    """
    Given the bounding box of a black frame, find the tightest crop of the
    white interior (excludes the frame pixels themselves).

    Strategy:
      1. Crop the frame region from the grayscale image.
      2. Build a mask of *non-dark* (i.e. interior) pixels.
      3. Erode slightly to avoid grabbing the very edge of the frame.
      4. Find the bounding box of the non-dark region → inner crop.
      5. Apply optional `padding` trim and return the colour crop.
    """
    # Clamp to image bounds
    img_h, img_w = src.shape[:2]
    x1 = max(fx, 0)
    y1 = max(fy, 0)
    x2 = min(fx + fw, img_w)
    y2 = min(fy + fh, img_h)

    roi_gray = gray[y1:y2, x1:x2]
    if roi_gray.size == 0:
        return None

    # Mask of pixels that are NOT part of the dark frame
    interior_mask = (roi_gray > threshold).astype(np.uint8) * 255

    # Erode a tiny bit to peel away the frame boundary pixels
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    interior_mask = cv2.erode(interior_mask, kernel, iterations=1)

    coords = cv2.findNonZero(interior_mask)
    if coords is None:
        return None

    ix, iy, iw, ih = cv2.boundingRect(coords)

    # Apply padding (positive trims inward)
    ix = max(ix + padding, 0)
    iy = max(iy + padding, 0)
    iw = max(iw - 2 * padding, 1)
    ih = max(ih - 2 * padding, 1)

    # Map local ROI coordinates back to full image
    abs_x1 = x1 + ix
    abs_y1 = y1 + iy
    abs_x2 = abs_x1 + iw
    abs_y2 = abs_y1 + ih

    return src[abs_y1:abs_y2, abs_x1:abs_x2].copy()


# ======================================================================== #
# CLI entry point
# ======================================================================== #

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Extract icons from a grid image with black rectangular frames."
    )
    parser.add_argument("image", help="Path to the source grid image.")
    parser.add_argument(
        "-o", "--output", default="extracted_icons",
        help="Output directory (default: extracted_icons)."
    )
    parser.add_argument(
        "--min-area", type=int, default=500,
        help="Minimum contour area to treat as a frame (default: 500)."
    )
    parser.add_argument(
        "--max-area", type=int, default=None,
        help="Maximum contour area (default: no limit)."
    )
    parser.add_argument(
        "--threshold", type=int, default=50,
        help="Darkness threshold 0-255 for frame detection (default: 50)."
    )
    parser.add_argument(
        "--padding", type=int, default=0,
        help="Extra pixels to trim inside each frame edge (default: 0)."
    )

    args = parser.parse_args()

    paths = extract_icons_from_grid(
        image_path=args.image,
        output_dir=args.output,
        min_frame_area=args.min_area,
        max_frame_area=args.max_area,
        frame_color_threshold=args.threshold,
        padding=args.padding,
    )
