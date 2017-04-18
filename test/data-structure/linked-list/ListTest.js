"use strict";

const assert = require('chai').assert;

const LinkedList = require('./../../../lib/stasht').LinkedList;
let list;

describe("Linked List", () => {
  beforeEach(() => {
    list = new LinkedList();
    list.pushFront(14);
    list.pushFront(45);
    list.pushFront(78);
    list.pushFront(613);
    list.pushFront(3);
    list.pushFront(4); // length = 6
  });

  describe("#pushFront", () => {
    it("should insert values to front of list", () => {
      list.pushFront(5);
      list.pushFront(6);

      const data = list.toArray();
      assert.equal(data[0], 6);
      assert.equal(data[1], 5);
      assert.equal(data.length, 8);
    });
  });

  describe("#pushBack", () => {
    it("should insert values to end of list", () => {
      list.pushBack(5);
      list.pushBack(6);

      const data = list.toArray();
      assert.equal(data[6], 5);
      assert.equal(data[7], 6);
      assert.equal(data.length, 8);
    });
  });

  describe("#topFront", () => {
    it("should show first value of list", () => {
      list.pushFront(5);
      list.pushFront(6);

      assert.equal(list.topFront(), 6);
      assert.equal(list.topFront(), 6);
      assert.equal(list.toArray().length, 8);
    });
  });

  describe("#topBack", () => {
    it("should show last value of list", () => {
      list.pushBack(5);
      list.pushBack(6);

      assert.equal(list.topBack(), 6);
      assert.equal(list.topBack(), 6);
      assert.equal(list.toArray().length, 8);
    });
  });

  describe("#popFront", () => {
    it("should return first value of list", () => {
      list.pushFront(5);
      list.pushFront(6);

      assert.equal(list.popFront(), 6);
      assert.equal(list.popFront(), 5);
      assert.equal(list.toArray().length, 6);
    });
  });

  describe("#popBack", () => {
    it("should return last value of list", () => {
      list.pushBack(5);
      list.pushBack(6);

      assert.equal(list.popBack(), 6);
      assert.equal(list.popBack(), 5);
      assert.equal(list.toArray().length, 6);
    });
  });

  describe ("#find", () => {
    it("should return true on value found", () => {
      assert.isTrue(list.find(14));
      assert.isTrue(list.find(45));
      assert.isTrue(list.find(78));
      assert.isTrue(list.find(613));
      assert.isTrue(list.find(3));
      assert.isTrue(list.find(4));
    });

    it("should return false on value not found", () => {
      assert.isFalse(list.find(13));
      assert.isFalse(list.find(46));
    });
  });

  describe ("#erase", () => {
    it("should return true on value erased", () => {
      assert.isTrue(list.erase(14));
      assert.equal(list.toArray().length, 5);

      assert.isTrue(list.erase(45));
      assert.equal(list.toArray().length, 4);

      assert.isTrue(list.erase(78));
      assert.equal(list.toArray().length, 3);

      assert.isTrue(list.erase(613));
      assert.equal(list.toArray().length, 2);

      assert.isTrue(list.erase(3));
      assert.equal(list.toArray().length, 1);

      assert.isTrue(list.erase(4));
      assert.equal(list.toArray().length, 0);
    });

    it("should return false on value not erased", () => {
      assert.isFalse(list.erase(143));
      assert.equal(list.toArray().length, 6);

      assert.isFalse(list.erase(435));
      assert.equal(list.toArray().length, 6);
    });
  });

  describe ("#empty", () => {
    it("should return true on empty", () => {
       list = new LinkedList();
       list.pushBack(14);
       list.erase(14);

       assert.isTrue(list.empty());
    });

    it("should return false on not-empty", () => {
       list = new LinkedList();
       list.pushBack(14);

       assert.isFalse(list.empty());
    });
  });

});
