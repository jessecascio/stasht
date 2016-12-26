"use strict";
var BinarySearch = (function () {
    function BinarySearch() {
    }
    BinarySearch.prototype.find = function (value, data) {
        if (!data) {
            return false;
        }
        var len = data.length;
        var i = Math.floor(len / 2);
        if (value === data[i]) {
            return true;
        }
        if (i === 0) {
            return value === data[i];
        }
        if (data[i] > value) {
            return this.find(value, data.slice(0, i));
        }
        else {
            return this.find(value, data.slice(i++, len));
        }
    };
    return BinarySearch;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BinarySearch;
//# sourceMappingURL=Search.js.map