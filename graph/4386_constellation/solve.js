// 그래프 클래스 없이 로직만 구현.
// 가중치가 있는 무방향 그래프 구현 필요.
// 그래프의 정점
function Star(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
}

// 그래프의 간선(가중치 있음)
function Edge(start, end, weight) {
  this.start = start;
  this.end = end;
  this.weight = weight;
}

// 입력
const fs = require("fs");

let [n, ...arr] = fs
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

n = Number(n);

// 그래프 정점 리스트
let stars = new Array(n).fill(-1);

// 입력받은 값을 정점으로 만들어 정점 리스트에 넣음.
for (let i in arr) {
  tmp_pos = arr[i].split(" ");
  stars[i] = new Star(Number(i), Number(tmp_pos[0]), Number(tmp_pos[1]));
}

// 간선 리스트.
edgeList = [];

// 간선의 입력은 없는 상태에서 각 점들간 거리를 계산해
// (시작 정점, 끝 정점, 가중치를 가지는)간선 객체를 만들어 간선 리스트에 넣음.
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const weight =
      ((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2) ** 0.5;
    edgeList.push(new Edge(stars[i].id, stars[j].id, weight));
  }
}

// 크러스컬 알고리즘 진행 준비

// 간선리스트의 가중치 오름차순 정렬.
edgeList.sort(function (a, b) {
  if (a.weight > b.weight) return 1;
  else return -1;
});

// 사이클을 만드는지 아닌지 판단하기 Union-find 기법을 이용.

// 각자 스스로를 가리키는 배열 선언. parent[i] = i 상태.
let parent = new Array(n);
for (let i = 0; i < n; i++) parent[i] = i;

// find를 통해 parent 배열에서 어떤 인덱스의 최상위 부모를 찾음.
// parent[i]가 i가 아니라 k일 경우 parent[k]를 탐색.
function find(x) {
  if (x == parent[x]) return x;
  return (parent[x] = find(parent[x]));
}

// 초기에 각 인덱스가 각 배열요소의 값
// union을 통해 parent[x]에 x가 아닌 새로운 값을 부여.
function union(x, y) {
  x = find(x);
  y = find(y);
  if (x != y) {
    parent[y] = x;
  }
}

// 정답값. 최소신장트리의 가중치가 담김.
let ans = 0;

// 크러스컬 알고리즘 진행.
for (let i = 0; i < edgeList.length; i++) {
  // edge리스트의 간선이 처음부터 차례로 담김.(= 가장 작은 값부터 차례로)
  const edge = edgeList[i];

  // 해당 간선의 정점이 같은 부모를 가지는지 검사(= 사이클을 이루는지 검사)
  if (find(edge.start) !== find(edge.end)) {
    // 사이클을 이루지 않으면 리턴값과 parent 배열에 추가
    // 최소신장트리를 위해 새로운 그래프를 만들지 않고 사이클 검사를 위해 정점만 parent배열에 추가됨.
    // 어차피 간선이 짧은 순서대로 진행되기 때문에(간선 선택에 영향을 미치는 또다른 변수가 없기 때문에) 간선을 저장할 필요 없음.
    ans += edge.weight;
    union(edge.start, edge.end);
  }
}

console.log(ans);
