const filePath = process.platform === "linux" ? "/dev/stdin" : "./test3.txt";

const [NM, ...maze] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const [N, M] = NM.split(" ").map(Number);

const [dx, dy] = [
  [1, 0, -1, 0],
  [0, -1, 0, 1],
];

// dfs
const visited = new Array(N).fill(0).map((v) => new Array(M).fill(false));
const q = [[0, 0]];
visited[0][0] = 1;

function isInMap(pos) {
  const [x, y] = pos;
  return x >= 0 && y >= 0 && x < M && y < N ? true : false;
}

while (q.length > 0) {
  const cur = q.shift();
  const [x, y] = cur;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + dx[i], y + dy[i]];
    if (isInMap([nx, ny]) && !visited[ny][nx] && maze[ny][nx] == "1") {
      q.push([nx, ny]);
      visited[ny][nx] = visited[y][x] + 1;
    }
  }
}

console.log(visited[N - 1][M - 1]);
