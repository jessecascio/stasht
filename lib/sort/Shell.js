"use strict";
/**
 * Time Complexity: N^2 / 2
 * Space Complexity: 0(1)
 */
var Shell = (function () {
    function Shell() {
    }
    Shell.sort = function (data) {
        if (!data.length) {
            return data;
        }
        var h = 1;
        while (h < data.length / 3) {
            h = 3 * h + 1;
        }
        while (h >= 1) {
            for (var i = h; i < data.length; i++) {
                for (var j = i; j >= h && data[(j - h)] >= data[j]; j -= h) {
                    var pointer = data[(j - h)];
                    data[(j - h)] = data[j];
                    data[j] = pointer;
                }
            }
            h = h / 3;
        }
        return data;
    };
    return Shell;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Shell;
//# sourceMappingURL=Shell.js.map