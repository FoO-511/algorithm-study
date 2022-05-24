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

function find(x, parents) {
  if (parents[x] == x) return x;
  return (parents[x] = find(parents[x], parents));
}

function union(x, y, parents) {
  x = find(x, parents);
  y = find(y, parents);
  if (x == y) return;
  parents[y] = x;
}

// find(x) == find(y)일 때 x에서 y까지 거친 정점 수(시작과 끝점 포함) = 사이클의 정점 개수
// bfs
function count_cycle_vertex(start, end, edges) {
  const q = new Queue();
  const visited = new Array(edges.length).fill(0);
  q.push(start);
  visited[start] = 1;

  while (q.length > 0) {
    const cur = q.pop();

    if (cur == end) return visited[cur];

    for (let i of edges[cur]) {
      if (!visited[i]) {
        visited[i] = visited[cur] + 1;
        q.push(i);
      }
    }
  }
  return 0;
}

function init_parents(V) {
  return new Array(V + 1).fill(0).map((v, i) => i);
}

function push_edge(edge, edges) {
  edges[edge[0]].push(edge[1]);
  edges[edge[1]].push(edge[0]);
}

function run_testcase(V, E, given_edges) {
  const _parents = init_parents(V);
  const _edges = new Array(V + 1).fill(0).map((v) => []);
  // 사이클을 이루는 정점이 짝수개 이면 이분 그래프임.
  for (let edge of given_edges) {
    // 하나씩 넣으며 find(x) == find(y)인지 체크
    // find(x) == find(y)이면 현재 edge를 넣으면 사이클 형성.
    const [x, y] = edge;
    if (find(x, _parents) == find(y, _parents)) {
      const cycle_count = count_cycle_vertex(x, y, _edges);
      if (cycle_count % 2 == 1) return false;
    }
    push_edge(edge, _edges);
    union(x, y, _parents);
  }

  return true;
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
