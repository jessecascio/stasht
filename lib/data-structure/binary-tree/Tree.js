"use strict";
var Node_1 = require("./Node");
/**
 * balanced binary tree
 */
var Tree = (function () {
    function Tree() {
    }
    /**
     * add an item to the tree
     * @param key
     */
    Tree.prototype.put = function (value) {
        this.root = this._put(this.root, value);
    };
    Tree.prototype._put = function (node, value) {
        if (!node) {
            return new Node_1.default(value);
        }
        if (!node.left) {
            node.left = new Node_1.default(value);
        }
        else if (!node.right) {
            node.right = new Node_1.default(value);
        }
        else if (node.right.size < node.left.size) {
            node.right = this._put(node.right, value);
        }
        else {
            node.left = this._put(node.left, value);
        }
        node.size = this._nodeSize(node.left) + this._nodeSize(node.right) + 1;
        return node;
    };
    Tree.prototype._nodeSize = function (node) {
        return node ? node.size : 0;
    };
    Tree.prototype.size = function () {
        return this.root ? this.root.size : 0;
    };
    Tree.prototype.reset = function () {
        delete this.root;
    };
    return Tree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
//# sourceMappingURL=Tree.js.map