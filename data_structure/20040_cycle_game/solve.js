const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const arr = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [n, m] = arr.shift();

let ans = 0;
const parent = new Array(n).fill(0).map((v, i) => i);

function find(x) {
  if (parent[x] == x) return x;
  return (parent[x] = find(parent[x]));
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a !== b) parent[b] = a;
}

// console.log(arr);

for (let i = 0; i < m; i++) {
  const [a, b] = arr[i];
  if (find(a) === find(b)) {
    ans = i + 1;
    break;
  }
  union(arr[i][0], arr[i][1]);
}

console.log(ans);
