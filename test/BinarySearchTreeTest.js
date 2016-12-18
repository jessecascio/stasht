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
      bst.put('x', 8);
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
      bst.put('x', 8);
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
      bst.put('x', 8);
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
  
  describe("#delete", () => {
    it ("should delete a value", () => {
      bst.put('s', 2);
      bst.put('e', 1);
      bst.put('x', 8);
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
  
});
 