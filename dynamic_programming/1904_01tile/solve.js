const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let N = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "");

N = Number(N);

const dp = [0, 1, 2];

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
}

console.log(dp[N]);
