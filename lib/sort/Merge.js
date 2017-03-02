"use strict";
/**
 * Time Complexity:
 * Space Complexity:
 */
var Merge = (function () {
    function Merge() {
    }
    // https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/overview-of-merge-sort
    Merge.sort = function (data) {
        if (!data.length) {
            return data;
        }
        var chunks = [];
        while (data.length) {
            chunks.push([data.pop()]);
        }
        if (chunks.length <= 1) {
            return chunks.pop();
        }
        chunks = this._syncDown(chunks);
        while (chunks.length !== 1) {
            chunks = this._syncDown(chunks);
        }
        return chunks.pop();
    };
    // syncs an array down by combing adjoining arrays
    Merge._syncDown = function (array) {
        var combined = [];
        for (var i = 0; i < array.length + 1; i += 2) {
            if (!array[i]) {
                continue;
            }
            if (!array[(i + 1)]) {
                combined.push(array[i]);
                continue;
            }
            combined.push(Merge._merge(array[i], array[(i + 1)]));
        }
        return combined;
    };
    // merge two array, maintaining order
    Merge._merge = function (arr1, arr2) {
        if (!arr1 && !arr2) {
            return [];
        }
        if (!arr1) {
            return arr2;
        }
        if (!arr2) {
            return arr1;
        }
        var x = 0;
        var y = 0;
        var sorted = [];
        while (sorted.length < arr1.length + arr2.length) {
            if (!arr1[x]) {
                sorted.push(arr2[y]);
                y++;
                continue;
            }
            if (!arr2[y]) {
                sorted.push(arr1[x]);
                x++;
                continue;
            }
            if (arr1[x] < arr2[y]) {
                sorted.push(arr1[x]);
                x++;
            }
            else {
                sorted.push(arr2[y]);
                y++;
            }
        }
        return sorted;
    };
    return Merge;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Merge;
//# sourceMappingURL=Merge.js.map