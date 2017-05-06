"use strict";

const assert = require("chai").assert;
const BinarySearch = require("./../../../lib/stasht").BinarySearch;

let data = [];
const bs = new BinarySearch();

describe("Binary Search", () => {
  beforeEach(() => {
    data.push(1);
    data.push(12);
    data.push(13);
    data.push(21);
    data.push(25);
    data.push(36);
    data.push(47);
    data.push(89);
    data.push(99);
    data.push(193);
  });

  describe("#find", () => {
    it ("should find values", () => {
      data.forEach((val) => {
        assert.isTrue(bs.find(val, data));
      });
    });

    it ("should not find values", () => {
      assert.isFalse(bs.find(10, data));
      assert.isFalse(bs.find(33, data));
      assert.isFalse(bs.find(82, data));
      assert.isFalse(bs.find(223, data));
    });
  });
});
