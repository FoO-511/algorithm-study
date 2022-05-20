const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [T, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = [];

const [dx, dy] = [
  [1, 0, -1, 0],
  [0, -1, 0, 1],
];

const isInMap = ([x, y], m, n) => {
  // n은 세로(y), m은 가로(x)
  return x < 0 || y < 0 || x >= m || y >= n ? false : true;
};

function dfs([x, y], m, n, visited, map) {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];
    if (isInMap([nx, ny], m, n) && !visited[ny][nx] && map[ny][nx] == 1)
      dfs([nx, ny], m, n, visited, map);
  }
}

function solution(m, n, k, pos) {
  const visited = new Array(n).fill(0).map((v) => new Array(m).fill(false));
  const map = new Array(n).fill(0).map((v) => new Array(m).fill(0));

  for (let i of pos) {
    const [x, y] = i.split(" ").map(Number);
    map[y][x] = 1;
  }

  let count = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (!visited[y][x] && map[y][x] == 1) {
        count++;
        dfs([x, y], m, n, visited, map);
      }
    }
  }

  return count;
}

let idx = 0;
for (let i = 0; i < Number(T); i++) {
  const [M, N, K] = arr[idx].split(" ").map(Number);
  idx++;
  const pos = arr.slice(idx, idx + K);
  ans.push(solution(M, N, K, pos));

  idx += K;
}

console.log(ans.join("\n"));
