export const Hexagon = (x, y, z) => {
  return { x: x, y: y, z: z };
};

export const AxialHex = (q, r) => {
  return { q, r };
};

const addHex = (a, b) => {
  return Hexagon(a.x + b.x, a.y + b.y, a.z + b.z);
};

// Directions on the Hexagonal grid
const directions = [
  Hexagon(1, -1, 0),
  Hexagon(1, 0, -1),
  Hexagon(0, 1, -1),
  Hexagon(-1, 1, 0),
  Hexagon(-1, 0, 1),
  Hexagon(0, -1, 1),
];

const inverse = (n) => n === 0 ? 0 : n * -1;

// const directions = {
//   right: Hexagon(1, -1, 0),
//   downRight: Hexagon(1, 0, -1),
//   downLeft: Hexagon(0, 1, -1),
//   left: Hexagon(-1, 1, 0),
//   upLeft: Hexagon(-1, 0, 1),
//   upRight: Hexagon(0, -1, 1)
// };

export const moveTarget = (hex, direction, radius = 3) => {
  const nextHex = addHex(hex, directions[direction]);
  if (distanceFromCenter(nextHex) <= radius) {
    return nextHex;
  } else {
    return Hexagon(inverse(hex.x), inverse(hex.y), inverse(hex.z));
  }
};

const distanceFromCenter = (hex) => {
  const { x, y, z } = hex;
  return [x, y, z]
    .map((n) => Math.abs(n))
    .sort()
    .pop();
};

const calculateTotalHexagons = (radius) => {
  return 3 * radius * (radius + 1) + 1;
};

export function cubeToAxial(cube) {
  let q = cube.y;
  let r = cube.z;
  return { q: inverse(q), r: inverse(r) };
}

export function axialToCube(axial) {
  let y = axial.q ;
  let z = axial.r ;
  let x = -y - z;
  return { x: inverse(x), y: inverse(y), z: inverse(z) };
}
