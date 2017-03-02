"use strict";
/**
 * Time Complexity: N^2 / 2
 * Space Complexity: 0(1)
 */
var Selection = (function () {
    function Selection() {
    }
    Selection.sort = function (data) {
        if (!data.length) {
            return data;
        }
        for (var i = 0; i < data.length; i++) {
            var min = i;
            for (var j = i + 1; j < data.length; j++) {
                if (data[j] < data[min]) {
                    min = j;
                }
            }
            var pointer = data[i];
            data[i] = data[min];
            data[min] = pointer;
        }
        return data;
    };
    return Selection;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Selection;
//# sourceMappingURL=Selection.js.map