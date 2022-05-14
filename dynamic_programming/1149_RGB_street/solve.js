const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const [r, g, b] = [0, 1, 2];

const dp = [[], [], []];
// 점화식
// p(n, color)  = n-1일 때 최소값 + 현재 색상

const first_house_cost = arr[0].split(" ").map(Number);
dp[r][0] = first_house_cost[0];
dp[g][0] = first_house_cost[1];
dp[b][0] = first_house_cost[2];

for (let i = 1; i < n; i++) {
  const costs = arr[i].split(" ").map(Number);
  dp[r][i] = Math.min(dp[g][i - 1], dp[b][i - 1]) + costs[r];
  dp[g][i] = Math.min(dp[r][i - 1], dp[b][i - 1]) + costs[g];
  dp[b][i] = Math.min(dp[g][i - 1], dp[r][i - 1]) + costs[b];
}

console.log(Math.min(dp[r][n - 1], dp[g][n - 1], dp[b][n - 1]));
