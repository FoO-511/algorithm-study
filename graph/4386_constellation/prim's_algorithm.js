function Star(id, x, y) {
  this.id = Number(id);
  this.x = Number(x);
  this.y = Number(y);
}
function Edge(start, end, weight) {
  this.start = start;
  this.end = end;
  this.weight = weight;
}

// 입력
let [n, ...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

n = Number(n);

// 그래프에 입력.( 정점과 간선에 값 입력 )
let stars = [];
let edges = [];

for (let i in arr) {
  star_x_y = arr[i].split(" ");
  stars[i] = new Star(i, star_x_y[0], star_x_y[1]);
}

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const s1 = stars[i];
    const s2 = stars[j];

    const weight = ((s1.x - s2.x) ** 2 + (s1.y - s2.y) ** 2) ** 0.5;
    edges.push(new Edge(s1.id, s2.id, weight));
  }
}

// 무향 연결 그래프에서 최소신장트리(MST)를 찾는 알고리즘.

// 프림 알고리즘의 과정
// 1. 임의의 정점을 선택해 T에 추가
// 2. T에 포함된 노드와 T에 포함되지 않은 노드들의 간선 중 가중치가 가장 작은 간선을 찾음.
// 3. 그 간선에 연결된 T에 포함되지 않은 노드를 T에 포함.
// 4. 모든 노드가 포함될 때까지 2, 3 반복.

// 프림 알고리즘

// 1. 임의의 정점을 선택해 T에 추가
let MST_nodes = new Set();
MST_nodes.add(stars[0].id);

// T에 포함된 노드의 간선들을 담는 리스트(우선순위 큐를 사용하는게 나음)
let tmp_edges = [];

let ans = 0;

// 4. 모든 노드가 포함될 때까지 2, 3 반복.
while (MST_nodes.size < n) {
  // 2. T에 포함된 노드와 T에 포함되지 않은 노드들의 간선 중 가중치가 가장 작은 간선을 찾음.
  // T에 포함된 노드의 간선들을 가중치가 작은 순으로 정렬
  tmp_edges = [];
  for (let i of MST_nodes) {
    tmp_edges = tmp_edges.concat(
      edges.filter(
        (v) =>
          (v.start === i && !MST_nodes.has(v.end)) ||
          (v.end === i && !MST_nodes.has(v.start))
      )
    );

    tmp_edges.sort(function (a, b) {
      if (a.weight > b.weight) return 1;
      else return -1;
    });
  }

  const shortest_edge = tmp_edges[0];
  if (!shortest_edge) continue;

  // 3. 그 간선에 연결된 T에 포함되지 않은 노드를 T에 포함.
  ans += shortest_edge.weight;
  MST_nodes.add(shortest_edge.start);
  MST_nodes.add(shortest_edge.end);
}

console.log(ans);
