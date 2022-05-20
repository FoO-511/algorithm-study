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
const edges = new Array(200000).fill(0).map((v) => []);
let count = 1;
const visited = new Array(n + 1).fill(0);

for (let i = 0; i < m; i++) {
  const [start, end] = edge_info[i];
  edges[start].push(end);
  edges[end].push(start);
}

edges.map((v) => v.sort((a, b) => a - b));

function bfs(cur) {
  const q = [cur];
  visited[cur] = count++;
  while (q.length > 0) {
    cur = q.shift();
    for (let i of edges[cur]) {
      if (visited[i] == 0) {
        visited[i] = count++;
        q.push(i);
      }
    }
  }
}

bfs(r);

console.log(visited.slice(1, n + 1).join("\n"));
