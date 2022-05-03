const [nodeN_edgeN, ...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

// O(n^2)시간 복잡도
const [nodeN, edgeN] = nodeN_edgeN.split(" ").map((v) => Number(v));

// 그래프 표현이 헷갈렸는데 이 문제에서 MST 그래프를 구현하지 않고 MST에 포함된 정점을 따지는 배열(selected)만 있음.
// ad는 모든 간선을 저장하는데, i번째에 i정점에서 출발하는 간선들을 모은 리스트
// dist는 selected에 새로운 정점이 추가될 때마다 ad에서 해당 정점의 인덱스가 가리키는 배열들 중
// 가장 가중치가 작은 값을 dist[새로운 노드]에 저장하는 것으로 갱신.
// 예외적으로 시작할 때 dist[임의의 노드]를 0으로 설정해 이후 임의의 노드를 MST에 넣는 과정을 거치도록 함.
const ad = new Array(nodeN + 1).fill(0).map((v) => []);
const dist = new Array(nodeN + 1).fill(Infinity);
const selected = new Array(nodeN + 1).fill(false);
let ans = 0;

// 모든 간선을 간선 목록에 저장
for (let i = 0; i < edgeN; i++) {
  const [start, end, weight] = arr[i].split(" ").map((v) => Number(v));
  ad[start].push([end, weight]);
  ad[end].push([start, weight]);
}

// 1번 노드를 선택한 것과 같은 효과
dist[1] = 0;

// MST의 노드와 MST에 속하지 않은 노드들간 가중치가 가장 작은 간선을 찾아내
// 그 간선과 연결된 정점을 MST(= selected)에 추가
for (let i = 1; i <= nodeN; i++) {
  let newNode = -1;
  let minDist = Infinity;

  for (let j = 1; j <= nodeN; j++) {
    if (!selected[j] && dist[j] < minDist) {
      minDist = dist[j];
      newNode = j;
    }
  }

  if (newNode < 0) {
    console.log(newNode, "err");
    break;
  }

  selected[newNode] = true;
  ans += dist[newNode];

  for (let edge of ad[newNode]) {
    dist[edge[0]] = Math.min(dist[edge[0]], edge[1]);
  }
}

console.log(ans);
