"use strict";
var Node_1 = require("./Node");
var Tree = (function () {
    function Tree() {
    }
    Tree.prototype.put = function (key, value) {
        this.root = this._put(this.root, key, value);
    };
    Tree.prototype.get = function (key) {
        return this._get(this.root, key);
    };
    Tree.prototype.min = function () {
        var node = this._min(this.root);
        return node ? node.key : null;
    };
    Tree.prototype.max = function () {
        return this._max(this.root, this.root.key);
    };
    Tree.prototype.size = function () {
        return this.root.size;
    };
    Tree.prototype.reset = function () {
        delete this.root;
    };
    Tree.prototype.floor = function (key) {
        var node = this._floor(this.root, key);
        return node.key;
    };
    Tree.prototype.deleteMin = function () {
        var node = this._deleteMin(this.root);
        return node ? true : false;
    };
    Tree.prototype.delete = function (key) {
        var node = this._delete(this.root, key);
        return node ? true : false;
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
            node.size = this.nodeSize(node.left) + this.nodeSize(node.right) + 1;
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
        successor.size = this.nodeSize(successor.left) + this.nodeSize(successor.right) + 1;
        return successor;
    };
    Tree.prototype.toArray = function () {
        return this._traverse(this.root, new Array());
    };
    Tree.prototype.select = function (selection) {
        var node = this._select(this.root, selection);
        return node.key;
    };
    Tree.prototype._select = function (node, selection) {
        return node;
    };
    /**
      * select()
      * rank()
      * delete()
      * deleteMin()
      * deleteMax()
      * keys()
      * range() - query
    */
    Tree.prototype._deleteMin = function (node) {
        if (!node) {
            return null;
        }
        if (!node.left) {
            return node.right;
        }
        node.left = this._deleteMin(node.left);
        node.size = this.nodeSize(node.left) + this.nodeSize(node.right) + 1;
        return node;
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
    Tree.prototype._max = function (node, key) {
        if (!node || !node.right) {
            return key;
        }
        else if (node.right.key > key) {
            return this._max(node.right, node.right.key);
        }
        else {
            return key;
        }
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
    Tree.prototype._put = function (node, key, value) {
        if (!node) {
            return new Node_1.default(key, value, 1);
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
        node.size = this.nodeSize(node.left) + this.nodeSize(node.right) + 1;
        return node;
    };
    Tree.prototype._get = function (node, key) {
        if (!node) {
            return null;
        }
        if (node.key === key) {
            return node.value;
        }
        else if (node.key > key) {
            return this._get(node.left, key);
        }
        else {
            return this._get(node.right, key);
        }
    };
    Tree.prototype.nodeSize = function (node) {
        return node ? node.size : 0;
    };
    return Tree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
//# sourceMappingURL=Tree.js.map