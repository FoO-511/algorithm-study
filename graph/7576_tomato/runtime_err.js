const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [MN, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = [];
const [m, n] = MN.split(" ").map(Number);
let target_count = n * m;

const [dx, dy] = [
  [1, 0, -1, 0],
  [0, -1, 0, 1],
];

const visited = new Array(n).fill(0).map((v) => new Array(m).fill(false));
const will_grow = new Array(n).fill(0).map((v) => new Array(m).fill(false));
const map = arr.map((v) => v.split(" ").map(Number));
const starting_point = [];

for (let y = 0; y < n; y++) {
  for (let x = 0; x < m; x++) {
    if (map[y][x] == 1) starting_point.push([y, x]);
    if (map[y][x] == -1) target_count--;
  }
}

const isInMap = ([y, x]) => {
  // n은 세로(y), m은 가로(x)
  return x < 0 || y < 0 || x >= m || y >= n ? false : true;
};

function dfs([y, x], count, visited) {
  visited[y][x] = true;
  count++;

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];
    if (isInMap([ny, nx]) && !visited[ny][nx]) {
      if (map[ny][nx] == 1) count = dfs([ny, nx], count, visited);
      if (map[ny][nx] == 0) will_grow[ny][nx] = true;
    }
  }
  return count;
}

function grow() {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (will_grow[y][x]) map[y][x] = 1;
    }
  }
}

function day_after() {
  let days = 0;
  let count = 0;
  let new_count = 0;

  while (days <= target_count) {
    visited.map((v) => v.fill(false));
    will_grow.map((v) => v.fill(false));

    new_count = 0;
    for (let i of starting_point) {
      new_count += dfs(i, 0, visited);

      if (new_count == target_count) {
        return days;
      }
    }
    if (count == new_count) return -1;
    count = new_count;

    // console.log(map, days);

    grow();

    days++;
  }

  return days;
}

console.log(day_after());

// console.log(ans.join("\n"));
