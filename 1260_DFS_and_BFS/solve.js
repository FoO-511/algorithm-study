const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [NMV, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const [N, M, V] = NMV.split(" ").map((v) => Number(v));
const edges = new Array(N + 1).fill(0).map((v) => []);

let dfs_ans = [];
let bfs_ans = [];

for (let i = 0; i < M; i++) {
  const [start, end] = arr[i].split(" ").map((v) => Number(v));
  edges[start].push(end);
  edges[end].push(start);
}

// 그냥 sort()만 쓰면 틀리고 어떻게 정렬할지 지정해야 함...
// 이게 말이냐 방구냐
edges.map((v) => v.sort((a, b) => a - b));

const visited = new Array(N + 1).fill(false);

function DFS(current_node) {
  if (visited[current_node]) return;
  visited[current_node] = true;

  dfs_ans.push(current_node);

  edges[current_node].forEach((v) => {
    if (!visited[v]) DFS(v);
  });
}

function BFS(start_node) {
  const q = [start_node];
  let current_node;

  while (q.length) {
    current_node = q.shift();
    if (visited[current_node]) continue;

    visited[current_node] = true;

    bfs_ans.push(current_node);

    edges[current_node].forEach((v) => {
      if (!visited[v]) {
        q.push(v);
      }
    });
  }
}

visited.fill(false);
DFS(V);
console.log(dfs_ans.join(" "));

visited.fill(false);
BFS(V);
console.log(bfs_ans.join(" "));
