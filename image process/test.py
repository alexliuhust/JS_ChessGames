import cv2
import os

import numpy as np


def get_file_list(dir, file_list, ext=None):
    new_dir = dir
    if os.path.isfile(dir):
        if ext is None:
            file_list.append(dir)
        else:
            if ext in dir[-3:]:
                file_list.append(dir)

    elif os.path.isdir(dir):
        for s in os.listdir(dir):
            new_dir = os.path.join(dir, s)
            get_file_list(new_dir, file_list, ext)

    return file_list


def risize_images(from_dir, to_dir, size):
    image_list = get_file_list(from_dir, [], 'png')

    for index in range(0, len(image_list)):
        img_path = image_list[index]
        img_name = os.path.splitext(os.path.basename(img_path))[0]
        img = cv2.imread(img_path, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (size, size), interpolation=cv2.INTER_AREA)
        cv2.imwrite(to_dir + img_name + ".png", img)


def binarize_image(img_path, name):
    img = cv2.imread(img_path, cv2.IMREAD_COLOR)
    height = img.shape[0]
    width = img.shape[1]

    newImg = np.zeros_like(img)

    o = 1
    for i in range(height):
        for j in range(width):
            if img[i][j][0] == 239 and img[i][j][1] == 239 and img[i][j][2] == 239:
                newImg[i][j] = [255, 255, 255]

            elif (img[i][j][0] != 239 and img[i][j][1] != 239 and img[i][j][2] != 239) \
                    and (img[i][j][0] != 255 and img[i][j][1] != 255 and img[i][j][2] != 255):
                newImg[i][j] = [0, 0, 0]
            else:
                newImg[i][j] = img[i][j]

    cv2.imwrite(name + ".png", newImg)


# risize_images('./raw_images/stormreef', './images/stormreef/', 50)
risize_images('./raw_images', './raw_images/', 100)
