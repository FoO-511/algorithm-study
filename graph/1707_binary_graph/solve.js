let ans;

const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [T, ...test_cases] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n")
  .map((v) => v.split(" ").map(Number));

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  push(data) {
    const node = new Node(data);
    if (this.length == 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.length++;
  }
  pop() {
    if (this.length == 0) return false;
    this.length--;
    const ret = this.head.data;
    this.head = this.head.next;
    return ret;
  }
}

function bfs(start, edges, visited) {
  const q = new Queue();
  q.push(start);
  visited[start] = 1;

  while (q.length > 0) {
    const cur = q.pop();

    // 번갈아 넣다가 그룹에 있는 값이 겹치게 되면 이분그래프가 아님
    for (let i of edges[cur]) {
      if (!visited[i]) {
        visited[i] = visited[cur] == 1 ? 2 : 1;
        q.push(i);
      } else if (visited[i] == visited[cur]) {
        return false;
      }
    }
  }

  return true;
}

function push_edge(edge, edges) {
  edges[edge[0]].push(edge[1]);
  edges[edge[1]].push(edge[0]);
}

function init_edge(V, given_edges) {
  const _edges = new Array(V + 1).fill(0).map((v) => []);
  for (let edge of given_edges) push_edge(edge, _edges);
  return _edges;
}

function run_testcase(V, E, given_edges) {
  let ret = true;
  const edges = init_edge(V, given_edges);
  const visited = new Array(V + 1).fill(0);

  for (let i = 1; i <= V; i++) {
    if (visited[i]) continue;
    // 방문하지 않은 정점 탐색.
    ret = bfs(i, edges, visited);
    if (ret == false) return ret;
  }

  return ret;
}

function solution(T, test_cases) {
  const ans = [];
  let idx = 0;
  for (let i = 0; i < T; i++) {
    const [V, E] = test_cases[idx++];
    ans.push(run_testcase(V, E, test_cases.slice(idx, idx + E)) ? "YES" : "NO");
    idx += E;
  }

  return ans;
}

ans = solution(T[0], test_cases);

console.log(ans.join("\n"));
