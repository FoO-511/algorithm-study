const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [T, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const dp = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9];

for (let i = 11; i <= 100; i++) {
  dp[i] = dp[i - 1] + dp[i - 5];
}

for (let i = 0; i < T; i++) {
  console.log(dp[Number(arr[i])]);
}
