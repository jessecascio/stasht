"use strict";
var Tree_1 = require("./binary-search-tree/Tree");
var bst = new Tree_1.default();
bst.put('s', 2);
bst.put('e', 1);
bst.put('x', 8);
bst.put('a', 8);
bst.put('r', 8);
bst.put('c', 8);
bst.put('h', 8);
bst.put('m', 8);
var out = bst.select(3);
console.log(out);
//# sourceMappingURL=mock.js.map