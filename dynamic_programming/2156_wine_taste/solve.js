const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const quan = [0].concat(arr.map(Number));

const dp = [0, quan[1], quan[1] + quan[2]];

for (let i = 3; i <= n; i++) {
  dp[i] = Math.max(dp[i - 3] + quan[i - 1] + quan[i], dp[i - 2] + quan[i]);

  dp[i] = Math.max(dp[i], dp[i - 1]);
}

console.log(dp[n]);
