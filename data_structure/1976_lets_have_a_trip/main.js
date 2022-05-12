const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, M, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const parents = new Array(parseInt(N) + 1).fill(0).map((v, i) => i);
parents[0] = null;

function find(a) {
  if (parents[a] == a) return a;
  return (parents[a] = find(parents[a]));
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a == b) return;
  parents[b] = parents[a];
}

for (let i = 1; i <= parseInt(N); i++) {
  const edges = arr[i - 1].split(" ").map(Number);
  for (let j = 1; j <= edges.length; j++) {
    if (edges[j - 1] == 1) union(i, j);
  }
}

const plan = arr[parseInt(N)].split(" ").map(Number);
let ans = true;

for (let i = 1; i < plan.length; i++) {
  if (find(plan[i - 1]) !== find(plan[i])) ans = false;
}

console.log(ans ? "YES" : "NO");
