"use strict";
var Node_1 = require("./Node");
var Queue_1 = require("./../Queue");
/**
 * binary search tree
 */
var Tree = (function () {
    function Tree() {
    }
    /**
     * add an item to the tree - O(n)
     * @param key
     * @param value
     */
    Tree.prototype.put = function (key, value) {
        this.root = this._put(this.root, key, value);
    };
    Tree.prototype._put = function (node, key, value) {
        if (!node) {
            return new Node_1.default(key, value);
        }
        if (node.key > key) {
            node.left = this._put(node.left, key, value);
        }
        else if (node.key < key) {
            node.right = this._put(node.right, key, value);
        }
        else {
            node.value = value;
        }
        node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
        return node;
    };
    /**
     * retrieve value from tree - O(n)
     * @param key
     * @return value
     */
    Tree.prototype.get = function (key) {
        var node = this._get(this.root, key);
        return node ? node.value : null;
    };
    Tree.prototype._get = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key === key) {
            return node;
        }
        else if (node.key > key) {
            return this._get(node.left, key);
        }
        else {
            return this._get(node.right, key);
        }
    };
    /**
     * Find a minimum key value - O(n)
     * @return key
     */
    Tree.prototype.min = function () {
        var node = this._min(this.root);
        return node ? node.key : null;
    };
    Tree.prototype._min = function (node) {
        if (!node) {
            return null;
        }
        else if (!node.left) {
            return node;
        }
        else {
            return this._min(node.left);
        }
    };
    /**
     * Find a maximum key value - O(n)
     * @return key
     */
    Tree.prototype.max = function () {
        var node = this._max(this.root);
        return node ? node.key : null;
    };
    Tree.prototype._max = function (node) {
        if (!node) {
            return null;
        }
        else if (!node.right) {
            return node;
        }
        else {
            return this._max(node.right);
        }
    };
    /**
     * round down to next key - O(n)
     * @param key
     * @return key
     */
    Tree.prototype.floor = function (key) {
        var node = this._floor(this.root, key);
        return node ? node.key : null;
    };
    Tree.prototype._floor = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key === key) {
            return node;
        }
        if (node.key > key) {
            return this._floor(node.left, key);
        }
        var newnode = this._floor(node.right, key);
        if (newnode) {
            return newnode;
        }
        else {
            return node;
        }
    };
    /**
     * round up to next key - O(n)
     * @param key
     * @return key
     */
    Tree.prototype.ceil = function (key) {
        var node = this._ceil(this.root, key);
        return node ? node.key : null;
    };
    Tree.prototype._ceil = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key === key) {
            return node;
        }
        if (node.key < key) {
            return this._ceil(node.right, key);
        }
        var newnode = this._ceil(node.left, key);
        if (newnode) {
            return newnode;
        }
        else {
            return node;
        }
    };
    /**
     * find key with <selection> smaller keys - O(n)
     * @param int
     * @return key
     */
    Tree.prototype.select = function (selection) {
        var node = this._select(this.root, selection);
        return node ? node.key : null;
    };
    Tree.prototype._select = function (node, selection) {
        if (!node) {
            return null;
        }
        var size = this._nodeSize(node.left);
        if (size > selection) {
            return this._select(node.left, selection);
        }
        else if (size < selection) {
            return this._select(node.right, selection - size - 1);
        }
        else {
            return node;
        }
    };
    /**
     * return number of keys less than rank - O(n)
     * @param key
     * @return int
     */
    Tree.prototype.rank = function (rank) {
        return this._rank(this.root, rank);
    };
    Tree.prototype._rank = function (node, rank) {
        if (!node) {
            return 0;
        }
        if (node.key > rank) {
            return this._rank(node.left, rank);
        }
        else if (node.key < rank) {
            return 1 + this._nodeSize(node.left) + this._rank(node.right, rank);
        }
        else {
            return this._nodeSize(node.left);
        }
    };
    /**
     * delete min key - O(n)
     */
    Tree.prototype.deleteMin = function () {
        this.root = this._deleteMin(this.root);
    };
    Tree.prototype._deleteMin = function (node) {
        if (!node) {
            return null;
        }
        if (!node.left) {
            return node.right;
        }
        node.left = this._deleteMin(node.left);
        node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
        return node;
    };
    /**
     * delete max key - O(n)
     */
    Tree.prototype.deleteMax = function () {
        this.root = this._deleteMax(this.root);
    };
    Tree.prototype._deleteMax = function (node) {
        if (!node) {
            return null;
        }
        if (!node.right) {
            return node.left;
        }
        node.right = this._deleteMax(node.right);
        node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
        return node;
    };
    /**
     * delete an item - O(n)
     * @param key
     */
    Tree.prototype.delete = function (key) {
        this.root = this._delete(this.root, key);
    };
    Tree.prototype._delete = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key > key) {
            node.left = this._delete(node.left, key);
            node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
            return node;
        }
        else if (node.key < key) {
            node.right = this._delete(node.right, key);
            node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
            return node;
        }
        // nodes are equal
        if (!node.right) {
            return node.left;
        }
        if (!node.left) {
            return node.right;
        }
        // @todo predecessor alternative
        var successor = this._successor(node, node.key);
        successor.right = this._deleteMin(successor);
        successor.left = node.left;
        successor.size = this._nodeSize(successor.left) + this._nodeSize(successor.right) + 1;
        return successor;
    };
    /**
     * find the next largest node - O(n)
     * @param key
     * @return key
     */
    Tree.prototype.successor = function (key) {
        var node = this._successor(this.root, key);
        return node ? node.key : null;
    };
    Tree.prototype._successor = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key > key) {
            return this._successor(node.left, key) || node;
        }
        else if (node.key < key) {
            return this._successor(node.right, key);
        }
        return this._min(node.right);
    };
    /**
     * find the next smallest node - O(n)
     * @param key
     * @return key
     */
    Tree.prototype.predecessor = function (key) {
        var node = this._predecessor(this.root, key);
        return node ? node.key : null;
    };
    Tree.prototype._predecessor = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key > key) {
            return this._predecessor(node.left, key);
        }
        else if (node.key < key) {
            return this._predecessor(node.right, key) || node;
        }
        return this._max(node.left);
    };
    /**
     * get size of tree - O(1)
     * @return int
     */
    Tree.prototype.size = function () {
        return this.root ? this.root.size : 0;
    };
    /**
     * reset the tree - O(1)
     */
    Tree.prototype.reset = function () {
        delete this.root;
    };
    /**
     * determine the size of a node - O(1)
     * @param Node
     * @return number
     */
    Tree.prototype._nodeSize = function (node) {
        return node ? node.size : 0;
    };
    /**
     * return an array of node keys within a range - O(n)
     * @param key - start
     * @param key - end
     * @return array
     */
    Tree.prototype.range = function (start, end) {
        var data = this._range(this.root, new Array(), start, end);
        return data;
    };
    Tree.prototype._range = function (node, data, start, end) {
        if (!node) {
            return data;
        }
        // get all keys, in order traversal
        if (!start && !end) {
            this._range(node.left, data);
            data.push(node.key);
            this._range(node.right, data);
            return data;
        }
        // add keys within the range, in order
        if (!start || (node.key > start)) {
            this._range(node.left, data, start, end);
        }
        if ((start && end) && (node.key >= start && node.key <= end)) {
            data.push(node.key);
        }
        else if ((start && !end) && (node.key >= start)) {
            data.push(node.key);
        }
        else if ((!start && end) && (node.key <= end)) {
            data.push(node.key);
        }
        if (!end || (node.key < end)) {
            this._range(node.right, data, start, end);
        }
        return data;
    };
    /**
     * in order traversal
     * @return array
     */
    Tree.prototype.inorder = function () {
        return this._inorder(this.root, new Array());
    };
    Tree.prototype._inorder = function (node, data) {
        if (!node) {
            return data;
        }
        this._inorder(node.left, data);
        data.push(node.key);
        this._inorder(node.right, data);
        return data;
    };
    /**
     * pre order traversal
     * @return array
     */
    Tree.prototype.preorder = function () {
        return this._preorder(this.root, new Array());
    };
    Tree.prototype._preorder = function (node, data) {
        if (!node) {
            return data;
        }
        data.push(node.key);
        this._preorder(node.left, data);
        this._preorder(node.right, data);
        return data;
    };
    /**
     * post order traversal
     * @return array
     */
    Tree.prototype.postorder = function () {
        return this._postorder(this.root, new Array());
    };
    Tree.prototype._postorder = function (node, data) {
        if (!node) {
            return data;
        }
        this._postorder(node.left, data);
        this._postorder(node.right, data);
        data.push(node.key);
        return data;
    };
    /**
     * breadth first traversal
     * @return array
     */
    Tree.prototype.levelorder = function () {
        var q = new Queue_1.default();
        q.enqueue(this.root);
        return this._levelorder(q, new Array());
    };
    Tree.prototype._levelorder = function (q, keys) {
        if (q.isEmpty()) {
            return keys;
        }
        var node = q.dequeue();
        if (node) {
            keys.push(node.key);
            if (node.left) {
                q.enqueue(node.left);
            }
            if (node.right) {
                q.enqueue(node.right);
            }
        }
        return this._levelorder(q, keys);
    };
    return Tree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
//# sourceMappingURL=Tree.js.map