function Star(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
}

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

let stars = new Array(n).fill(-1);

for (let i in arr) {
  tmp_pos = arr[i].split(" ");
  stars[i] = new Star(Number(i), Number(tmp_pos[0]), Number(tmp_pos[1]));
}
// console.log(stars);

edgeList = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const weight =
      ((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2) ** 0.5;
    edgeList.push(new Edge(stars[i].id, stars[j].id, weight));
  }
}

// console.log(edgeList);

edgeList.sort(function (a, b) {
  if (a.weight > b.weight) return 1;
  else return -1;
});

// console.log(edgeList);

let parent = new Array(n);
for (let i = 0; i < n; i++) parent[i] = i;

let ans = 0;

function find(x) {
  if (x == parent[x]) return x;
  return (parent[x] = find(parent[x]));
}
function union(x, y) {
  x = find(x);
  y = find(y);
  if (x != y) {
    parent[y] = x;
  }
}

for (let i = 0; i < edgeList.length; i++) {
  const edge = edgeList[i];

  if (find(edge.start) !== find(edge.end)) {
    ans += edge.weight;
    union(edge.start, edge.end);
  }
}

console.log(ans);
