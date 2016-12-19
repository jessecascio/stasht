"use strict";

const assert = require('chai').assert;
const BinarySearchTree = require('./../lib/stasht').BinarySearchTree;

const bst = new BinarySearchTree();

describe("Binary Search Tree", () => {
  beforeEach(() => {
    bst.reset();
  });

  describe("#put", () => {
    it ("should be able to put key/value pairs", () => {
      bst.put('c', 2);
      assert.equal(bst.get('c'), 2);
    });

    it ("should update existing keys", () => {
      bst.put('c', 2);
      bst.put('c', 12);

      assert.equal(bst.get('c'), 12);
    });
  });

  describe("#get", () => {
    it ("should be able to get a key", () => {
      bst.put('c', 2);
      bst.put('z', 1);
      bst.put('a', 8);

      assert.equal(bst.get('z'), 1);
    });

    it ("should return null on not found", () => {
      bst.put('c', 2);
      assert.equal(bst.get('z'), null);
    });
  });

  describe("#size", () => {
    it ("should be able to determine correct size", () => {
      bst.put('c', 2);
      bst.put('e', 2);

      assert.equal(bst.size(), 2);
    });

    it ("should return zero on empty tree", () => {
      assert.equal(bst.size(), 0);
    });
  });

  describe("#max", () => {
    it ("should be able to find max key", () => {
      bst.put('c', 2);
      bst.put('z', 1);
      bst.put('a', 8);

      assert.equal(bst.max(), 'z');
    });

    it ("should return null for empty tree", () => {
      assert.equal(bst.max(), null);
    });
  });

  describe("#min", () => {
    it ("should be able to find min key", () => {
      bst.put('c', 2);
      bst.put('z', 1);
      bst.put('a', 8);

      assert.equal(bst.min(), 'a');
    });

    it ("should return null for empty tree", () => {
      assert.equal(bst.min(), null);
    });
  });

  describe("#floor", () => {
    it ("should be able to find floor", () => {
      bst.put('c', 2);
      bst.put('z', 1);
      bst.put('a', 8);

      assert.equal(bst.floor('b'), 'a');
      assert.equal(bst.floor('c'), 'c');
    });

    it ("should find a deep floor", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('y', 8);
      bst.put('a', 8);
      bst.put('r', 8);
      bst.put('c', 8);
      bst.put('h', 8);
      bst.put('m', 8);

      assert.equal(bst.floor('g'), 'e');
    });

    it ("should return null for empty tree", () => {
      assert.equal(bst.floor(), null);
    });
  });

  describe("#ceil", () => {
    it ("should be able to find ceil", () => {
      bst.put('c', 2);
      bst.put('z', 1);
      bst.put('a', 8);

      assert.equal(bst.ceil('b'), 'c');
      assert.equal(bst.ceil('c'), 'c');
    });

    it ("should find a deep ceil", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('y', 8);
      bst.put('a', 8);
      bst.put('r', 8);
      bst.put('c', 8);
      bst.put('z', 8);
      bst.put('m', 8);

      assert.equal(bst.ceil('g'), 'm');
    });

    it ("should return null for empty tree", () => {
      assert.equal(bst.ceil(), null);
    });
  });

  describe("#deleteMin", () => {
    it ("should delete min value", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('y', 8);
      bst.put('a', 8);
      bst.put('r', 8);
      bst.put('c', 8);
      bst.put('h', 8);
      bst.put('m', 8);

      assert.equal(bst.min(), 'a');
      bst.deleteMin();
      assert.equal(bst.get('a'), null);

      assert.equal(bst.min(), 'c');
      bst.deleteMin();
      assert.equal(bst.get('c'), null);

      assert.equal(bst.min(), 'e');
    });

    it ("update size after deletion", () => {
      bst.put('h', 8);
      bst.put('m', 8);
      bst.deleteMin();
      assert.equal(bst.get('h'), null);
      assert.equal(bst.size(), 1);
    });

    it ("should not crash on empty tree", () => {
      assert.equal(bst.deleteMin(), undefined);
    });
  });
  
  describe("#deleteMax", () => {
    it ("should delete max value", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('y', 8);
      bst.put('a', 8);
      bst.put('r', 8);
      bst.put('c', 8);
      bst.put('h', 8);
      bst.put('m', 8);

      assert.equal(bst.max(), 'y');
      bst.deleteMax();
      assert.equal(bst.get('y'), null);

      assert.equal(bst.max(), 's');
      bst.deleteMax();
      assert.equal(bst.get('s'), null);

      assert.equal(bst.max(), 'r');
    });

    it ("update size after deletion", () => {
      bst.put('h', 8);
      bst.put('m', 8);
      bst.deleteMax();
      assert.equal(bst.get('m'), null);
      assert.equal(bst.size(), 1);
    });

    it ("should not crash on empty tree", () => {
      assert.equal(bst.deleteMax(), undefined);
    });
  });

  describe("#delete", () => {
    it ("should delete a value", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('y', 8);
      bst.put('a', 8);
      bst.put('r', 8);
      bst.put('c', 8);
      bst.put('h', 8);
      bst.put('m', 8);

      assert.equal(bst.size(), 8);
      assert.equal(bst.get('c'), 8);
      bst.delete('c');
      
      assert.equal(bst.get('c'), null);
      assert.equal(bst.size(), 7);
    });

    it ("should return update size after deletion", () => {
      bst.put('h', 8);
      bst.put('m', 8);
      bst.delete('m')
      assert.equal(bst.size(), 1);
    });

    it ("should not crash on empty tree", () => {
      assert.equal(bst.delete(), undefined);
    });
  });

  describe("#select", () => {
    it ("should return null on empty tree", () => {
      assert.equal(bst.select(4), null);
    });

    it ("should find correct selection", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('y', 8);
      bst.put('a', 8);
      bst.put('r', 8);
      bst.put('c', 8);
      bst.put('h', 8);
      bst.put('m', 8);

      assert.equal(bst.select(3), 'h');
    });
  });

  describe("#rank", () => {
    it ("should return zero on empty tree", () => {
      assert.equal(bst.rank('3'), 0);
    });

    it ("should find correct ranks", () => {
      bst.put('a', 8);
      bst.put('c', 8);
      bst.put('e', 1);
      bst.put('h', 8);
      bst.put('m', 8);
      bst.put('r', 8);
      bst.put('s', 2);
      bst.put('y', 8);
      
      assert.equal(bst.rank('h'), 3);
      assert.equal(bst.rank('y'), 7);
      assert.equal(bst.rank('a'), 0);
      assert.equal(bst.rank('z'), 8);
      assert.equal(bst.rank('n'), 5);
    });
  });

  describe("#json", () => {
    it ("should return a valid JSON object", () => {
      bst.put('whoop', 7);
      const json = bst.json();
      const str = JSON.stringify(json);
      const obj = JSON.parse(str);
      assert.isTrue(typeof obj === 'object');
    });

    it ("should return tree as an object", () => {
      bst.put('whoop', 7);
      const json = bst.json();
      assert.equal(json.whoop, 7);
    });

    it ("should return object keys in order", () => {
      bst.put('whoop', 7);
      bst.put('ally', 32);
      bst.put('pbr', 3);

      const json = bst.json();
      const keys = Object.keys(json);

      assert.equal(keys.length, 3);
      assert.equal(keys[0], 'ally');
      assert.equal(keys[2], 'whoop');
    });
  });

  describe("#keys", () => {
    it ("should return an array of keys", () => {
      bst.put('whoop', 7);
      bst.put('thur', 5);

      const keys = bst.keys();
      assert.isTrue(Array.isArray(keys));
    });

    it ("should return all keys", () => {
      bst.put('whoop', 7);
      bst.put('thur', 5);

      const keys = bst.keys();
      assert.equal(keys.length, 2);
    });

    it ("should return correct keys ordered", () => {
      bst.put('whoop', 7);
      bst.put('thur', 5);

      const keys = bst.keys();
      assert.equal(keys[0], 'thur');
      assert.equal(keys[1], 'whoop');
    });
  });

   describe("#range", () => {
    it ("should return an array of keys", () => {
      bst.put('whoop', 7);
      bst.put('thur', 5);

      const keys = bst.range();
      assert.isTrue(Array.isArray(keys));
    });

    it ("should return all keys within range", () => {
      bst.put('whoop', 7);
      bst.put('mill', 5);

      let keys = bst.range('a', 'z');
      assert.equal(keys.length, 2);

      keys = bst.range('a', 'p');
      assert.equal(keys.length, 1);
    });

    it ("should allow for null start/end", () => {
      bst.put('whoop', 7);
      bst.put('thur', 5);
      bst.put('fri', 5);
      bst.put('abc', 5);

      let keys = bst.range('c');
      assert.equal(keys.length, 3);

      keys = bst.range(null, 'm');
      assert.equal(keys.length, 2);
    });
  });
});
 