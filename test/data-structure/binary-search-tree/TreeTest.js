"use strict";

const assert = require('chai').assert;
const BinarySearchTree = require('./../../../lib/stasht').BinarySearchTree;

const bst = new BinarySearchTree();

describe("Binary Search Tree", () => {
  beforeEach(() => {
    bst.reset();
    bst.put('s', 2);
    bst.put('e', 1);
    bst.put('y', 8);
    bst.put('a', 8);
    bst.put('r', 8);
    bst.put('c', 8);
    bst.put('h', 8);
    bst.put('m', 8);
  });

  describe("#put", () => {
    it ("should be able to put key/value pairs", () => {
      bst.put('j', 2);
      assert.equal(bst.get('j'), 2);
    });

    it ("should update existing keys", () => {
      bst.put('j', 2);
      bst.put('j', 12);

      assert.equal(bst.get('j'), 12);
    });
  });

  describe("#get", () => {
    it ("should be able to get a key", () => {
      assert.equal(bst.get('m'), 8);
    });

    it ("should return null on not found", () => {
      assert.equal(bst.get('q'), null);
    });
  });

  describe("#size", () => {
    it ("should be able to determine correct size", () => {
      assert.equal(bst.size(), 8);
    });

    it ("should return zero on empty tree", () => {
      bst.reset();
      assert.equal(bst.size(), 0);
    });
  });

  describe("#max", () => {
    it ("should be able to find max key", () => {
      assert.equal(bst.max(), 'y');
    });

    it ("should return null for empty tree", () => {
      bst.reset();
      assert.equal(bst.max(), null);
    });
  });

  describe("#min", () => {
    it ("should be able to find min key", () => {
      assert.equal(bst.min(), 'a');
    });

    it ("should return null for empty tree", () => {
      bst.reset();
      assert.equal(bst.min(), null);
    });
  });

  describe("#floor", () => {
    it ("should be able to find floor", () => {
      assert.equal(bst.floor('b'), 'a');
      assert.equal(bst.floor('c'), 'c');
      assert.equal(bst.floor('g'), 'e');
    });

    it ("should return null for empty tree", () => {
      bst.reset();
      assert.equal(bst.floor('j'), null);
    });
  });

  describe("#ceil", () => {
    it ("should be able to find ceil", () => {
      assert.equal(bst.ceil('c'), 'c');
      assert.equal(bst.ceil('d'), 'e');
    });

    it ("should return null for empty tree", () => {
      bst.reset();
      assert.equal(bst.ceil('j'), null);
    });
  });

  describe("#deleteMin", () => {
    it ("should delete min value", () => {
      assert.equal(bst.min(), 'a');
      bst.deleteMin();
      assert.equal(bst.get('a'), null);

      assert.equal(bst.min(), 'c');
      bst.deleteMin();
      assert.equal(bst.get('c'), null);

      assert.equal(bst.min(), 'e');
    });

    it ("update size after deletion", () => {
      bst.deleteMin();
      assert.equal(bst.get('a'), null);
      assert.equal(bst.size(), 7);
    });

    it ("should not crash on empty tree", () => {
      bst.reset();
      assert.equal(bst.deleteMin(), undefined);
    });
  });
  
  describe("#deleteMax", () => {
    it ("should delete max value", () => {
      assert.equal(bst.max(), 'y');
      bst.deleteMax();
      assert.equal(bst.get('y'), null);

      assert.equal(bst.max(), 's');
      bst.deleteMax();
      assert.equal(bst.get('s'), null);

      assert.equal(bst.max(), 'r');
    });

    it ("update size after deletion", () => {
      bst.deleteMax();
      assert.equal(bst.get('y'), null);
      assert.equal(bst.size(), 7);
    });

    it ("should not crash on empty tree", () => {
      bst.reset();
      assert.equal(bst.deleteMax(), undefined);
    });
  });

  describe("#delete", () => {
    it ("should delete a value", () => {
      assert.equal(bst.size(), 8);
      assert.equal(bst.get('c'), 8);
      bst.delete('c');
      
      assert.equal(bst.get('c'), null);
    });

    it ("should update tree size after deletion", () => {
      bst.delete('m')
      assert.equal(bst.size(), 7);
    });

    it ("should not crash on empty tree", () => {
      bst.reset();
      assert.equal(bst.delete(), undefined);
    });

     it ("should delete max value", () => {
      bst.delete('y');
      assert.equal(bst.size(), 7);
    });

    it ("should delete min value", () => {
      bst.delete('a');
      assert.equal(bst.size(), 7);
    });

    it ("should delete root", () => {
      bst.delete('s');
      assert.equal(bst.size(), 7);
    });

    it ("should handle out of bounds deletions", () => {
      bst.delete('z');
      bst.delete('A');
      assert.equal(bst.size(), 8);
    });
  });

  describe("#select", () => {
    it ("should return null on empty tree", () => {
      bst.reset();
      assert.equal(bst.select(4), null);
    });

    it ("should find correct selection", () => {
      assert.equal(bst.select(3), 'h');
    });
  });

  describe("#rank", () => {
    it ("should return zero on empty tree", () => {
      bst.reset();
      assert.equal(bst.rank('3'), 0);
    });

    it ("should find correct ranks", () => {
      assert.equal(bst.rank('h'), 3);
      assert.equal(bst.rank('y'), 7);
      assert.equal(bst.rank('a'), 0);
      assert.equal(bst.rank('z'), 8);
      assert.equal(bst.rank('n'), 5);
    });
  });

  describe("#range", () => {
    it ("should return an array of keys", () => {
      const keys = bst.range();
      assert.isTrue(Array.isArray(keys));
    });

    it ("should return all keys within range", () => {
      let keys = bst.range('a', 'z');
      assert.equal(keys.length, 8);

      keys = bst.range('a', 'p');
      assert.equal(keys.length, 5);
    });

    it ("should allow for null start/end", () => {
      let keys = bst.range('c');
      assert.equal(keys.length, 7);

      keys = bst.range(null, 'm');
      assert.equal(keys.length, 5);
    });
  });

  describe("#successor", () => {
    it ("should return a successor node", () => {
      assert.equal(bst.successor('a'), 'c');
      assert.equal(bst.successor('c'), 'e');
      assert.equal(bst.successor('e'), 'h');
      assert.equal(bst.successor('h'), 'm');
      assert.equal(bst.successor('m'), 'r');
      assert.equal(bst.successor('r'), 's');
      assert.equal(bst.successor('s'), 'y');
      assert.equal(bst.successor('y'), null);
    });

    it ("should return a successor for phantom node", () => {
      assert.equal(bst.successor('b'), 'c');
      assert.equal(bst.successor('n'), 'r');
      assert.equal(bst.successor('x'), 'y');
      assert.equal(bst.successor('y'), null);
      assert.equal(bst.successor('z'), null);
    });
  });

  describe("#predecessor", () => {
    it ("should return a prepredecessor node", () => {
      assert.equal(bst.predecessor('a'), null);
      assert.equal(bst.predecessor('c'), 'a');
      assert.equal(bst.predecessor('e'), 'c');
      assert.equal(bst.predecessor('h'), 'e');
      assert.equal(bst.predecessor('m'), 'h');
      assert.equal(bst.predecessor('r'), 'm');
      assert.equal(bst.predecessor('s'), 'r');
      assert.equal(bst.predecessor('y'), 's');
    });

    it("should return a predecessor for phantom node", () => {
      assert.equal(bst.predecessor('b'), 'a');
      assert.equal(bst.predecessor('n'), 'm');
      assert.equal(bst.predecessor('x'), 's');
      assert.equal(bst.predecessor('a'), null);
    });
  });

  describe("#inorder", () => {
    it ("should return an array", () => {
      assert.isTrue(Array.isArray(bst.inorder()));
    });

    it ("should return tree keys in order", () => {
      const keys = bst.inorder();
      assert.equal(keys.length, 8);
      assert.equal(keys[0], 'a');
      assert.equal(keys[2], 'e');
      assert.equal(keys[7], 'y');
    });
  });

  describe("#preorder", () => {
    it ("should return an array", () => {
      assert.isTrue(Array.isArray(bst.preorder()));
    });

    it ("should return tree keys in pre-order", () => {
      const keys = bst.preorder();
      assert.equal(keys.length, 8);
      assert.equal(keys[0], 's');
      assert.equal(keys[2], 'a');
      assert.equal(keys[7], 'y');
    });
  });

  describe("#postorder", () => {
    it ("should return an array", () => {
      assert.isTrue(Array.isArray(bst.postorder()));
    });

    it ("should return tree keys in post-order", () => {
      const keys = bst.postorder();
      assert.equal(keys.length, 8);
      assert.equal(keys[0], 'c');
      assert.equal(keys[2], 'm');
      assert.equal(keys[7], 's');
    });
  });

  describe("#levelorder", () => {
    it ("should return an array", () => {
      assert.isTrue(Array.isArray(bst.levelorder()));
    });

    it ("should return tree keys in level order", () => {
      const keys = bst.levelorder();
      assert.equal(keys.length, 8);
      assert.equal(keys[0], 's');
      assert.equal(keys[2], 'y');
      assert.equal(keys[7], 'm');
    });
  });
});
 