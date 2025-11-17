const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 1000;

const rows = 25;
const cols = 25;
const cellSize = canvas.width / cols;

// Crear instancia de Matrix y cargar el mapa
const mapMatrix = new Matrix(rows, cols);
mapMatrix.fillFromArray(MAP_DATA);
console.log(mapMatrix.toString());

// Cargar imágenes
const images = {};
let loadedCount = 0;
const totalImages = 198;

for (let i = 0; i < totalImages; i++) {
  const img = new Image();
  img.src = `assets/${i}.png`;
  img.onload = () => {
    loadedCount++;
    if (loadedCount === totalImages) {
      drawMap(); // solo cuando todas estén listas
    }
  };
  images[i] = img;
}

// Dibujar mapa
function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const value = mapMatrix.getValue(r, c);
      const img = images[value];
      if (img && img.complete) {
        ctx.drawImage(img, c * cellSize, r * cellSize, cellSize, cellSize);
      } else if (img) {
        img.onload = () => {
          ctx.drawImage(img, c * cellSize, r * cellSize, cellSize, cellSize);
        };
      }
    }
  }
}

drawMap();
