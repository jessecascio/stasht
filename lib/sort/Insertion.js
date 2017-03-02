"use strict";
/**
 * Time Complexity: N^2 / 2
 * Space Complexity: 0(1)
 */
var Insertion = (function () {
    function Insertion() {
    }
    Insertion.sort = function (data) {
        if (!data.length) {
            return data;
        }
        for (var i = 1; i < data.length; i++) {
            for (var j = i; j > 0 && data[(j - 1)] >= data[j]; j--) {
                var pointer = data[(j - 1)];
                data[(j - 1)] = data[j];
                data[j] = pointer;
            }
        }
        return data;
    };
    return Insertion;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Insertion;
//# sourceMappingURL=Insertion.js.map