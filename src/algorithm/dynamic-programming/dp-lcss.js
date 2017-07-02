
// longest common sub sequence

let T = [];

let str1 = '1 2 3 4 1'.split(" ");
let str2 = '3 4 1 2 1 3'.split(" ");

for (let i=0; i<str1.length; i++) {

  T[i] = [];

  for (let j=0; j<str2.length; j++) {

    if (str1[i] === str2[j]) {
      let p = !T[i-1] || !T[i-1][j-1] ? 0 : T[i-1][j-1];
      T[i][j] = p + 1; 
    } else {
      let p1 = T[i-1] && T[i-1][j] ? T[i-1][j] : 0;
      let p2 = T[i][j-1] ? T[i][j-1] : 0;

      T[i][j] = Math.max(p1, p2);
    }

  } 
}

console.log('MAX Substring:', T[str1.length - 1][str2.length - 1]);
console.log(T);
return;

let ls = [];
let i = str1.length - 1, j = str2.length - 1;

while (i > 0 && j > 0) {
  if (T[i][j-1] === T[i][j]) {
    j--;
  } else {
    ls.push(str1[i]);
    i--;
    j--;
  }
}

if (T[0][0] == 1) {
  ls.push(str1[0]);
}

let cs = '';

while (ls.length) {
  cs += ls.pop();
}

console.log('CHARS', cs);
