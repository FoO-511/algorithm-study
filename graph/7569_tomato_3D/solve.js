const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [MNH, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = 0;
const [m, n, h] = MNH.split(" ").map(Number);

const [dx, dy, dz] = [
  [1, 0, 0, -1, 0, 0],
  [0, 0, -1, 0, 0, 1],
  [0, -1, 0, 0, 1, 0],
];
arr = arr.map((v) => v.split(" ").map(Number));

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

const q = new Queue();
const map = new Array(h).fill(0).map((v) => []);
for (let i = 0; i < h; i++) {
  map[i].push(...arr.slice(i * n, (i + 1) * n));
}
// console.log(map.length, map[0].length, map[0][0].length);

for (let z = 0; z < h; z++) {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (map[z][y][x] == 1) q.push([z, y, x]);
    }
  }
}

const isInMap = ([z, y, x]) => {
  // n은 세로(y), m은 가로(x), h는 세로(z)
  return x < 0 || y < 0 || z < 0 || x >= m || y >= n || z >= h ? false : true;
};

function hasZero() {
  for (let z = 0; z < h; z++) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        ans = Math.max(ans, map[z][y][x]);
        if (map[z][y][x] == 0) return true;
      }
    }
  }
  return false;
}

function bfs() {
  while (q.length > 0) {
    const [z, y, x] = q.pop();

    for (let i = 0; i < 6; i++) {
      const [nz, ny, nx] = [z + dz[i], y + dy[i], x + dx[i]];
      // console.log(ny, nx, isInMap([ny, nx]));
      if (isInMap([nz, ny, nx]) && map[nz][ny][nx] == 0) {
        map[nz][ny][nx] = map[z][y][x] + 1;
        q.push([nz, ny, nx]);
      }
    }
  }
}

bfs();

console.log(hasZero() ? -1 : ans - 1);

// console.log(ans);
