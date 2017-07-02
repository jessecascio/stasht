
var P = [];
var str = 'ABCD';

permute(str, 0, str.length - 1);

console.log("PERMIES", P.length);
console.log("LIST:", P.join(", "));

function permute(str, l, r) {
  if (l === r) {
    P.push(str);
  } else {
    for (var i=l; i<=r; i++) {
      str = swap(str, l, i);
      permute(str, l+1, r);
      str = swap(str, l, i);
    }
  }
}

function swap(str, i, j) {
  var tmp = str[i];
  str = str.substring(0, i) + str[j] + str.substring(i + 1);
  str = str.substring(0, j) + tmp + str.substring(j + 1);
  return str;
}

