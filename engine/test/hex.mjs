import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  AxialHex,
  Hexagon,
  moveTarget,
  cubeToAxial,
  axialToCube,
} from "../src/hex.mjs";

describe("Hex cube coords", () => {
  describe("moveTarget", () => {
    test("right", () => {
      assert.deepStrictEqual(
        moveTarget(Hexagon(0, 0, 0), 0),
        Hexagon(1, -1, 0)
      );
    });
    
    test("downRight", () => {
      assert.deepStrictEqual(
        moveTarget(Hexagon(0, 0, 0), 1),
        Hexagon(1, 0, -1)
      );
    });
    
    test("downLeft", () => {
      assert.deepStrictEqual(
        moveTarget(Hexagon(0, 0, 0), 2),
        Hexagon(0, 1, -1)
      );
    });
    
    test("left", () => {
      assert.deepStrictEqual(
        moveTarget(Hexagon(0, 0, 0), 3),
        Hexagon(-1, 1, 0)
      );
    });
    
    test("upLeft", () => {
      assert.deepStrictEqual(
        moveTarget(Hexagon(0, 0, 0), 4),
        Hexagon(-1, 0, 1)
      );
    });

    test("upRight", () => {
      assert.deepStrictEqual(
        moveTarget(Hexagon(0, 0, 0), 5),
        Hexagon(0, -1, 1)
      );
    });

    test("in a circle", () => {
      let hex = Hexagon(0, 0, 0);
      hex = moveTarget(hex, 0);
      assert.deepStrictEqual(hex, Hexagon(1, -1, 0));

      hex = moveTarget(hex, 1);
      assert.deepStrictEqual(hex, Hexagon(2, -1, -1));

      hex = moveTarget(hex, 2);
      assert.deepStrictEqual(hex, Hexagon(2, 0, -2));

      hex = moveTarget(hex, 3);
      assert.deepStrictEqual(hex, Hexagon(1, 1, -2));

      hex = moveTarget(hex, 4);
      assert.deepStrictEqual(hex, Hexagon(0, 1, -1));

      hex = moveTarget(hex, 5);
      assert.deepStrictEqual(hex, Hexagon(0, 0, 0));
    });
  });

  describe("moveTarget out of bounds", () => {
    test("Should wrap the target correctly if it moves out of bounds", () => {
      let hex = Hexagon(0, 0, 0);

      hex = moveTarget(hex, 0);
      hex = moveTarget(hex, 0);
      hex = moveTarget(hex, 0);
      assert.deepStrictEqual(hex, Hexagon(3, -3, 0));
      hex = moveTarget(hex, 0);
      assert.deepStrictEqual(hex, Hexagon(-3, 3, 0));
    });
  });

  describe("cubeToAxial", () => {
    test("(0, 0, 0) === (0, 0)", () =>
      assert.deepStrictEqual(
        cubeToAxial({ x: 0, y: 0, z: 0 }),
        AxialHex(0, 0)
      ));
    test("(1, -1, 0) === (1, 0)", () =>
      assert.deepStrictEqual(
        cubeToAxial({ x: 1, y: -1, z: 0 }),
        AxialHex(1, 0)
      ));
    test("(-2, 1, 1) === (-1, -1)", () =>
      assert.deepStrictEqual(
        cubeToAxial({ x: -2, y: 1, z: 1 }),
        AxialHex(-1, -1)
      ));
  });

  // Testing axialToCube function
  describe("axialToCube", () => {
    test("(1, -2) === (-1, -1, 2)", () =>
      assert.deepStrictEqual(axialToCube({ q: 1, r: -2 }), Hexagon(-1, -1, 2)));
    test("(0, 0) === (0, 0, 0)", () =>
      assert.deepStrictEqual(axialToCube({ q: 0, r: 0 }), Hexagon(0, 0, 0)));
  });
});
