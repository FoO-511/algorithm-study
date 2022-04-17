let [nk, ...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

let [n, k] = nk.split(" ").map((v) => Number(v));
let ground = new Array(n + 1).fill(0).map((v) => []);

let bm = new Array(n + 1).fill(-1);
let visited = new Array(n + 1).fill(false);
let ans = 0;

for (let i = 0; i < arr.length; i++) {
  let [x, y] = arr[i].split(" ").map((v) => Number(v));
  ground[x].push(y);
}

function dfs(row) {
  if (visited[row]) return false;
  visited[row] = true;

  for (let i = 0; i < ground[row].length; i++) {
    const column = ground[row][i];

    if (bm[column] === -1 || dfs(bm[column])) {
      bm[column] = row;
      return true;
    }
  }
  return false;
}

for (let i = 1; i <= n; i++) {
  visited.fill(false);
  if (dfs(i)) ans++;
}

console.log(ans);
