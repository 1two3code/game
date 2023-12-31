window.addEventListener("load", () => {
  const canvas = document.getElementById("hexCanvas");
  const ctx = canvas.getContext("2d");
  const hexSize = 80; // Adjust the size of the hexagons
  const radius = 3; // Adjust the radius of the hex grid

  // Function to convert hexagon coordinates to pixel coordinates
  function hexToPixel(q, r) {
    const x = hexSize * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
    const y = hexSize * ((3 / 2) * r);
    return { x: canvas.width / 2 + x, y: canvas.height / 2 + y };
  }

  // Function to draw a hexagon
  function drawHexagon(x, y, fill = '#FFF') {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6; // Rotate 60 degrees
      const hx = x + hexSize * Math.cos(angle);
      const hy = y + hexSize * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(hx, hy);
      } else {
        ctx.lineTo(hx, hy);
      }
    }
    ctx.closePath();
    ctx.fillStyle = fill
    ctx.fill();
    ctx.stroke();
  }

  const inverse = (n) => n === 0 ? 0 : n * -1;
  function axialToCube(axial) {
    let y = axial.q ;
    let z = axial.r ;
    let x = -y - z;
    return { x: inverse(x), y: inverse(y), z: inverse(z) };
  }

  function getFill(hex) {
    if (hex.x === 0 && hex.y === 0 && hex.z === 0) {
      return '#FFFF9B' // yellow
    }
    else if (hex.x === 0) {
      return '#FFE0E0' // red
    }
    else if (hex.y === 0) {
      return '#D8FFDF' // green
    }
    else if (hex.z === 0) {
      return '#E9E8FF' // blue
    }
    return '#FFF'
  }
  // Function to draw the hex grid with coordinates
  function drawHexGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000";

    for (let q = -radius; q <= radius; q++) {
      const r1 = Math.max(-radius, -q - radius);
      const r2 = Math.min(radius, -q + radius);
      for (let r = r1; r <= r2; r++) {

        const c = axialToCube({ q, r });

        const { x, y } = hexToPixel(q, r);
        drawHexagon(x, y, getFill(c));

        // Render coordinates inside the hexagon
        ctx.fillStyle = "#000";

        ctx.font = "24px Arial";
        ctx.fillText(`q:${q}, r:${r}`, x - 32, y);

        ctx.font = "14px Arial";
        ctx.fillText(`x:${c.x}, y:${c.y}, z:${c.z}`, x - 32, y + 22);
      }
    }
  }

  drawHexGrid();
});
