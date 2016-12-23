"use strict";
var Node_1 = require("./Node");
/**
 * balanced binary tree
 */
var Balanced = (function () {
    function Balanced() {
    }
    /**
     * add an item to the tree
     * @param key
     */
    Balanced.prototype.put = function (value) {
        this.root = this._put(this.root, value);
    };
    Balanced.prototype._put = function (node, value) {
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
    Balanced.prototype._nodeSize = function (node) {
        return node ? node.size : 0;
    };
    Balanced.prototype.size = function () {
        return this.root ? this.root.size : 0;
    };
    Balanced.prototype.reset = function () {
        delete this.root;
    };
    return Balanced;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Balanced;
//# sourceMappingURL=Balanced.js.map