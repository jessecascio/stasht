
// smallest sub array

var k = 11;
var n = [1, 4, 7, 10, 3];

n.sort((p, c) => {
  if (p < c) {
    return -1;
  } else if (p > c) {
    return 1;
  } else {
    return 0;
  }
});

var T = [];

for (var i = 0; i < n.length; i++) {
  T[i] = new Array(k + 1).fill(true);

  for (var j = 1; j <= k; j++) {
    if (n[i] < j && !T[i - 1]) {
      T[i][j] = false;
    } else if (n[i] < j && T[i - 1]) {
      T[i][j] = T[i - 1][j];
    } else if (n[i] === j) {
      T[i][j] = true;
    } else if (n[i] > j && !T[i - 1]) {
      T[i][j] = false;
    } else if (n[i] > j && j - n[i] >= 0) {
      T[i][j] = T[i - 1][j - n[i]];
    } else {
      T[i][j] = false;
    }
  }
}

console.log("ROW 1", T[0]);
console.log("ROW 2", T[1]);

