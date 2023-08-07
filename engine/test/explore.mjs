import test, { describe } from "node:test";
import assert from "node:assert/strict";
import explore from "../src/explore.mjs";

describe("explore", () => {
  const player = {
    r: 0,
    q: 0,
  };
  
  test("enters UNKNOWN", (_t) => {
    assert.equal(explore(), "explore");
  });
});
