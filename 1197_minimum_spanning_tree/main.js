const [nodeN_edgeN, ...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const [nodeN, edgeN] = nodeN_edgeN.split(" ").map((v) => Number(v));

class PQ {
  constructor() {
    this.heap = [];
    this.size = 0;
  }
  compare(a, b) {
    return a[1] < b[1] ? true : false;
  }
  push(edge) {
    let loc = ++this.size;
    while (loc !== 1 && this.compare(edge, this.heap[parseInt(loc / 2)])) {
      this.heap[loc] = this.heap[parseInt(loc / 2)];
      loc = parseInt(loc / 2);
    }
    this.heap[loc] = edge;
  }
  top() {
    return this.heap[this.size];
  }
  pop() {
    const top = this.heap[1];
    let parent = 1;
    let child = 2;
    let temp = this.heap[this.size--]; // 제일 끝값(최하위노드)

    while (this.size > child) {
      // 자식 노드 중 더 우선순위 높은 값 선택
      if (
        child < this.size &&
        this.compare(this.heap[child + 1], this.heap[child])
      )
        child++;

      //
      if (this.compare(temp, this.heap[child])) break;

      this.heap[parent] = this.heap[child];
      parent = child;
      child *= 2;
    }

    this.heap[parent] = temp;
    return top;
  }
  empty() {
    return this.size === 0 ? true : false;
  }
}

const ad = new Array(nodeN + 1).fill(0).map((v) => []);
const selected = new Array(nodeN + 1).fill(false);
const dist = new PQ();

let ans = 0;

// 모든 간선을 간선 목록에 저장
for (let i = 0; i < edgeN; i++) {
  const [start, end, weight] = arr[i].split(" ").map((v) => Number(v));
  ad[start].push([end, weight]);
  ad[end].push([start, weight]);
}

dist.push([1, 0]); //[목적지, 가중치]

// 모든 노드가 포함되어야 하므로 노드 개수만큼 반복
for (let i = 1; i <= nodeN; i++) {
  let now = -1;
  min_dist = Infinity;
  while (!dist.empty()) {
    now = dist.top()[0]; // 가중치가 제일 작은 간선과 연결된 노드
    if (!selected[now]) {
      console.log(dist.heap);
      min_dist = dist.top()[1];
      break;
      //   간선에 없는 노드이면 min_dist 갱신
      // 간선에 있는 노드일 경우 dist안에 있는 다른 간선을 탐색
    }
    dist.pop();
    console.log("pop", dist.heap);
  }
  console.log(min_dist);
  ans += min_dist;
  selected[now] = true;

  for (let edge of ad[now]) {
    dist.push(edge);
  }
}

console.log(ans);
