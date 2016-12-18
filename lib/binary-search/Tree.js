"use strict";
var Node_1 = require("./Node");
/**
 * binary search tree
 */
var Tree = (function () {
    function Tree() {
    }
    /**
     * add an item to the tree
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
     * retrieve value from tree
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
     * Find a minimum key value
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
     * Find a maximum key value
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
     * roud down to next key
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
     * roud up to next key
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
     *
     */
    Tree.prototype.select = function (selection) {
        var node = this._select(this.root, selection);
        return node.key;
    };
    Tree.prototype._select = function (node, selection) {
        return node;
    };
    /**
     * delete min key
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
     * delete an item
     * @param key
     * @return boolean
     */
    Tree.prototype.delete = function (key) {
        this.root = this._delete(this.root, key);
    };
    Tree.prototype._delete = function (node, key) {
        if (!node) {
            return null;
        }
        var equal = true;
        if (node.key > key) {
            equal = false;
            node.left = this._delete(node.left, key);
        }
        else if (node.key < key) {
            equal = false;
            node.right = this._delete(node.right, key);
        }
        if (!equal) {
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
        var successor = this._min(node.right);
        successor.right = this._deleteMin(successor);
        successor.left = node.left;
        successor.size = this._nodeSize(successor.left) + this._nodeSize(successor.right) + 1;
        return successor;
    };
    /**
     * get size of tree
     * @return number
     */
    Tree.prototype.size = function () {
        return this.root.size;
    };
    /**
     * reset the tree
     */
    Tree.prototype.reset = function () {
        delete this.root;
    };
    /**
     * array representation of tree, keys ordered ASC
     * @return array || object
     */
    Tree.prototype.toArray = function () {
        return this._traverse(this.root, new Array());
    };
    Tree.prototype._traverse = function (node, data) {
        if (!node) {
            return data;
        }
        this._traverse(node.left, data);
        data[String(node.key)] = node.value;
        this._traverse(node.right, data);
        return data;
    };
    /**
     * determine size of a node
     * @param Node
     * @return number
     */
    Tree.prototype._nodeSize = function (node) {
        return node ? node.size : 0;
    };
    return Tree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
//# sourceMappingURL=Tree.js.map