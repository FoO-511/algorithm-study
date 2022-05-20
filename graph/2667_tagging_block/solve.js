const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [N, ...map] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = [];
const n = Number(N);
const visited = new Array(n).fill(0).map((v) => new Array(n).fill(false));

const isInMap = ([x, y]) => {
  return x < 0 || y < 0 || x >= n || y >= n ? false : true;
};

const [dx, dy] = [
  [1, 0, -1, 0],
  [0, -1, 0, 1],
];

function dfs([x, y], count) {
  visited[y][x] = true;
  count++;

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];
    if (isInMap([nx, ny]) && !visited[ny][nx] && map[ny][nx] == "1")
      count = dfs([nx, ny], count);
  }
  return count;
}

for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    if (!visited[y][x] && map[y][x] == "1") {
      let count = 0;
      count = dfs([x, y], count);
      ans.push(count);
    }
  }
}

console.log(ans.length + "\n" + ans.sort((a, b) => a - b).join("\n"));
