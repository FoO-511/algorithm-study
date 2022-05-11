const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [T, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

function BFS(edges, nodes, startNode) {
  let count = 0;
  let q = [startNode];
  const visited = [];

  while (q.length > 0) {
    // const cur = q.shift();
    const cur = q[0];
    q = q.slice(1);

    if (visited.indexOf(cur) >= 0) continue;

    visited.push(cur);
    count++;

    for (let i of edges[cur]) {
      q.push(i);
    }
  }

  return count;
}

function count(F, testcase) {
  const nodes = new Set();
  const edges = {};

  for (let i in testcase) {
    const [f1, f2] = testcase[i].split(" ");
    nodes.add(f1);
    nodes.add(f2);

    if (!edges.hasOwnProperty(f1)) {
      edges[f1] = [f2];
    } else {
      edges[f1].push(f2);
    }

    if (!edges.hasOwnProperty(f2)) {
      edges[f2] = [f1];
    } else {
      edges[f2].push(f2);
    }

    console.log(BFS(edges, nodes, f1));
  }
}

let F = 0;
let testcase = [];
for (let i = 0; i < T; i++) {
  F = arr.shift();

  testcase = arr.slice(0, F);
  arr = arr.slice(F);
  count(F, testcase);
}
