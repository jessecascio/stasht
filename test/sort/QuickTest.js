"use strict";

const assert = require("chai").assert;
const Quick = require("./../../lib/stasht").QuickSort;

describe("Quick Sort", () => {
  describe ("#sort", () => {
    it ("should sort an array of ints", () => {
      const sorted = Quick.sort([3123, 1, 3, 4, 523, 42, 124, 534, 323, 12, 924, 923, 2]);
      assert.equal(sorted[0], 1);
      assert.equal(sorted[1], 2);
      assert.equal(sorted[4], 12);
      assert.equal(sorted[4], 12);
      assert.equal(sorted[6], 124);
      assert.equal(sorted[11], 924);
      assert.equal(sorted[12], 3123);
    });
  });
});
