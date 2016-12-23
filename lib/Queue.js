"use strict";
var Queue = (function () {
    function Queue() {
        this.data = [];
        this.q_size = 0;
        this.index = 0;
    }
    // O(1)
    Queue.prototype.enqueue = function (item) {
        this.data.push(item);
        this.q_size++;
    };
    // O(1)
    Queue.prototype.dequeue = function () {
        if (this.isEmpty()) {
            return null;
        }
        // re-indexes after data.shift(), dont use
        var item = this.data[this.index];
        delete this.data[this.index]; // free memory
        this.index++;
        this.q_size--;
        return item;
    };
    // O(1)
    Queue.prototype.isEmpty = function () {
        return this.q_size === 0;
    };
    // O(1)
    Queue.prototype.size = function () {
        return this.q_size;
    };
    // O(1)
    Queue.prototype.peek = function () {
        return !this.isEmpty() ? this.data[this.index] : null;
    };
    // O(1)
    Queue.prototype.reset = function () {
        this.data = [];
        this.q_size = this.index = 0;
    };
    return Queue;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue;
//# sourceMappingURL=Queue.js.map