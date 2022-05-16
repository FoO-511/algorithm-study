const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const num_arr = arr.split(" ").map(Number);

const dp = [num_arr[0]];
let ans = num_arr[0];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(num_arr[i], dp[i - 1] + num_arr[i]);
  ans = Math.max(ans, dp[i]);
}

// console.log(dp);
console.log(ans);
