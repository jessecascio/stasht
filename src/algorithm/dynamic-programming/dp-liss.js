
// longest increasing sub sequence

var n = [17, 7, 9, 0, 10, 19];
var SQ = new Array(n.length).fill(1);

var j = 1;

while (j < n.length) {
  for (var i=0; i<j; i++) {
    if (n[i] < n[j]) {
      SQ[j] = Math.max(SQ[i] + 1, SQ[j]);
    }
  }

  j++;
}

var m = SQ[n.length - 1];

console.log("MAX:", m);

// revers the numbers to find sequence: 4, 3, 2, 1
