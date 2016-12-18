"use strict";
var Tree_1 = require("./binary-search/Tree");
var bst = new Tree_1.default();
bst.put('h', 8);
bst.put('m', 8);
console.log(bst.size(), bst.toArray());
bst.deleteMin();
console.log(bst.size(), bst.toArray());
bst.delete('m');
console.log(bst.size(), bst.toArray());
//# sourceMappingURL=mock.js.map