const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [T, ...test_cases] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [dx, dy] = [
  [2, 1, -1, -2, -2, -1, 1, 2],
  [-1, -2, -2, -1, 1, 2, 2, 1],
];

const map = new Array(300).fill(0).map((v) => new Array(300).fill(0));

class Queue {
  constructor() {
    this.length = 0;
    this.q = [];
    this.head = 0;
  }
  push(data) {
    this.length++;
    this.q.push(data);
  }
  pop() {
    if (this.length == 0) return false;
    this.length--;
    return this.q[this.head++];
  }
}

function isInMap([y, x], I) {
  return x >= 0 && y >= 0 && x < I && y < I ? true : false;
}

function bfs(start, dest, I) {
  const q = new Queue();
  start.reverse();
  dest.reverse();
  q.push(start);
  map[start[0]][start[1]] = 1;

  while (q.length > 0) {
    const [y, x] = q.pop();

    if (y == dest[0] && x == dest[1]) {
      return map[y][x] - 1;
    }

    for (let i = 0; i < 8; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];
      if (isInMap([ny, nx], I) && map[ny][nx] == 0) {
        // console.log(1);
        q.push([ny, nx]);
        map[ny][nx] = map[y][x] + 1;
      }
    }
  }
}

function solution(test_cases) {
  let ans = [];

  for (let i = 0; i < T[0]; i++) {
    map.map((v) => v.fill(0));
    const I = test_cases[i * 3][0];
    const [start, dest] = [test_cases[i * 3 + 1], test_cases[i * 3 + 2]];
    ans.push(bfs(start, dest, test_cases[i * 3][0]));
  }

  return ans;
}

let ans = solution(test_cases);

console.log(ans.join("\n"));
