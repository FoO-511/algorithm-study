// 무향 연결 그래프에서 최소신장트리(MST)를 찾는 알고리즘.

// 프림 알고리즘의 과정
// 1. 임의의 정점을 선택해 T에 추가
// 2. T에 포함된 노드와 T에 포함되지 않은 노드들의 간선 중 가중치가 가장 작은 간선을 찾음.
// 3. 그 간선에 연결된 T에 포함되지 않은 노드를 T에 포함.
// 4. 모든 노드가 포함될 때까지 2, 3 반복.

// * 가중치가 있는 인접리스트 그래프 구현
function GraphNode(end, weight) {
  this.end = end;
  this.weight = weight;
}

class Graph {
  constructor() {
    this.edges = {};
    this.nodes = [];
  }

  addNode(v) {
    this.nodes.push(v);
  }

  addEdge(v1, v2, weight) {
    if (this.nodes.indexOf(v1) === -1 || this.nodes.indexOf(v2) === -1) {
      console.log("no such vertex");
    } else {
      const newNode = new GraphNode(null, weight);
      newNode.end = v2;
      this.edges[v1] = newNode;

      const newNode2 = new GraphNode(null, weight);
      newNode2.end = v1;
      this.edges[v2] = newNode2;
    }
  }
}

// 그래프 초기화
let g = new Graph();
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");
g.addNode("F");
g.addNode("G");

g.addEdge("A", "C", 100);
g.addEdge("A", "B", 3);
g.addEdge("A", "D", 4);
g.addEdge("C", "D", 3);
g.addEdge("D", "E", 8);
g.addEdge("E", "F", 10);
g.addEdge("B", "G", 9);

// 프림 알고리즘
const MST = new Graph(); // 최소신장트리가 들어갈 그래프
let visited = new Set(); // 방문한 노드 저장

// 1. 임의의 정점을 선택해 T에 추가
let s = g.nodes[0];
visited.add(s);
MST.addNode(s);

// 2. T에 포함된 노드와 T에 포함되지 않은 노드들의 간선 중 가중치가 가장 작은 간선을 찾음.
// T에 포함된 노드의 간선들을 담는 리스트 선언(우선순위 큐를 사용하는게 나음)
const edgeList = [];
g.edges[s].forEach((edge) => {
  edgeList.push(edge);
});

const currentEdge = edgeList
  .sort(function (a, b) {
    if (a.weight > b.weight) return 1;
    else return -1;
  })
  .pop();

// 3. 그 간선에 연결된 T에 포함되지 않은 노드를 T에 포함.
// 4. 모든 노드가 포함될 때까지 2, 3 반복.

while (edgeList.length !== 0) {
  while (edgeList.length !== 0 && visited.indexOf(currentEdge[1]) !== -1) {
    currentEdge = edgeList.pop();
  }

  let nextNode = currentEdge[1];

  if (visited.indexOf(nextNode) === -1) {
    MST.addNode(nextNode);
    MST.addEdge(currentEdge[0], nextNode, currentEdge[2]);

    g.edges[nextNode].forEach((edge) => {
      edgeList.push(edge);
    });
    currentEdge = edgeList
      .sort(function (a, b) {
        if (a.weight > b.weight) return 1;
        else return -1;
      })
      .pop();

    s = nextNode;
  }
}

console.log(MST);
