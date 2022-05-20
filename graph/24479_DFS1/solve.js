const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [NMR, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = [];
const [n, m, r] = NMR.split(" ").map(Number);
const edge_info = arr.map((v) => v.split(" ").map(Number));
// edges를 m+1 길이로 초기화 하니 계속 런타임 에러가 떴다.
// 멘탈 깨져서 죽는줄...

// n+1로 해야했던 거였음...ㅇㄴ
const edges = new Array(n + 1).fill(0).map((v) => []);
let count = 1;
const visited = new Array(n + 1).fill(0);

for (let i = 0; i < m; i++) {
  const [start, end] = edge_info[i];
  edges[start].push(end);
  edges[end].push(start);
}

edges.map((v) => v.sort((a, b) => a - b));

function dfs(cur) {
  visited[cur] = count++;
  for (let i of edges[cur]) {
    if (visited[i] == 0) dfs(i);
  }
}

dfs(r);

console.log(visited.slice(1, n + 1).join("\n"));
