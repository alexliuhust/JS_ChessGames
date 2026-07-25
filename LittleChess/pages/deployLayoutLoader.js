const root = document.getElementById("deployLayoutRoot");

if (!root) {
  throw new Error("Missing #deployLayoutRoot element");
}

const response = await fetch("./deployLayout.html");

if (!response.ok) {
  throw new Error("Failed to load deployLayout.html");
}

root.innerHTML = await response.text();
