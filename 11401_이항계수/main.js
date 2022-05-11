const [n, k] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split(" ")
  .map((v) => Number(v));

const dp = new Array(n + 1).fill(0).map((v) => new Array(k + 1).fill(1));

for (let i = 1; i <= n; i++) {
  for (let j = 0; j <= k; j++) {
    if (j == 0) dp[i][j] = 1;
    else if (i == j) dp[i][j] = 1;
    else dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];

    dp[i][j] = BigInt(dp[i][j]) % BigInt(100000007);
  }
}

console.log(dp[n][k].toString());
