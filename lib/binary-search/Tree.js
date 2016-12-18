"use strict";
const Node_1 = require("./Node");
class Tree {
    put(key, value) {
        this.root = this._put(this.root, key, value);
    }
    get(key) {
        return this._get(this.root, key);
    }
    min() {
        const node = this._min(this.root);
        return node ? node.key : null;
    }
    max() {
        return this._max(this.root, this.root.key);
    }
    size() {
        return this.root.size;
    }
    reset() {
        delete this.root;
    }
    floor(key) {
        const node = this._floor(this.root, key);
        return node.key;
    }
    deleteMin() {
        const node = this._deleteMin(this.root);
        return node ? true : false;
    }
    delete(key) {
        const node = this._delete(this.root, key);
        return node ? true : false;
    }
    _delete(node, key) {
        if (!node) {
            return null;
        }
        let equal = true;
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
        if (!node.right) {
            return node.left;
        }
        if (!node.left) {
            return node.right;
        }
        let successor = this._min(node.right);
        successor.right = this._deleteMin(successor);
        successor.left = node.left;
        successor.size = this.nodeSize(successor.left) + this.nodeSize(successor.right) + 1;
        return successor;
    }
    toArray() {
        return this._traverse(this.root, new Array());
    }
    select(selection) {
        const node = this._select(this.root, selection);
        return node.key;
    }
    _select(node, selection) {
        return node;
    }
    _deleteMin(node) {
        if (!node) {
            return null;
        }
        if (!node.left) {
            return node.right;
        }
        node.left = this._deleteMin(node.left);
        node.size = this.nodeSize(node.left) + this.nodeSize(node.right) + 1;
        return node;
    }
    _min(node) {
        if (!node) {
            return null;
        }
        else if (!node.left) {
            return node;
        }
        else {
            return this._min(node.left);
        }
    }
    _floor(node, key) {
        if (!node) {
            return null;
        }
        if (node.key === key) {
            return node;
        }
        if (node.key > key) {
            return this._floor(node.left, key);
        }
        let newnode = this._floor(node.right, key);
        if (newnode) {
            return newnode;
        }
        else {
            return node;
        }
    }
    _max(node, key) {
        if (!node || !node.right) {
            return key;
        }
        else if (node.right.key > key) {
            return this._max(node.right, node.right.key);
        }
        else {
            return key;
        }
    }
    _traverse(node, data) {
        if (!node) {
            return data;
        }
        this._traverse(node.left, data);
        data[String(node.key)] = node.value;
        this._traverse(node.right, data);
        return data;
    }
    _put(node, key, value) {
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
    }
    _get(node, key) {
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
    }
    nodeSize(node) {
        return node ? node.size : 0;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
//# sourceMappingURL=Tree.js.map