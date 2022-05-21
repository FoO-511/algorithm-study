const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [MN, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = 0;
const [m, n] = MN.split(" ").map(Number);

const [dx, dy] = [
  [1, 0, -1, 0],
  [0, -1, 0, 1],
];

class Queue {
  constructor() {
    this.length = 0;
    this.head = 0;
    this.q = [];
  }
  push(data) {
    this.q.push(data);
    this.length++;
  }
  pop() {
    if (this.length == 0) return null;
    this.length--;
    return this.q[this.head++];
  }
}

const map = arr.map((v) => v.split(" ").map(Number));
const q = new Queue();

for (let y = 0; y < n; y++) {
  for (let x = 0; x < m; x++) {
    if (map[y][x] == 1) q.push([y, x]);
  }
}

const isInMap = ([y, x]) => {
  // n은 세로(y), m은 가로(x)
  return x < 0 || y < 0 || x >= m || y >= n ? false : true;
};

function hasZero() {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      ans = Math.max(ans, map[y][x]);
      if (map[y][x] == 0) return true;
    }
  }
  return false;
}

function bfs() {
  while (q.length > 0) {
    const [y, x] = q.pop();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];
      // console.log(ny, nx, isInMap([ny, nx]));
      if (isInMap([ny, nx]) && map[ny][nx] == 0) {
        map[ny][nx] = map[y][x] + 1;
        q.push([ny, nx]);
      }
    }
  }
}

bfs();

console.log(hasZero() ? -1 : ans - 1);

// console.log(ans);
