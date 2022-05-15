const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const lines = arr
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]); //[start, end]

// 이번엔 인덱스 1에서부터 시작x
// 1번째가 0번 인덱스가 됨.
const dp = [1];
const dp_dec = [1];
let ans = 1;

// LIS 응용 문제

// LIS
for (let i = 1; i < n; i++) {
  dp[i] = 1;
  for (let j = 0; j < i; j++) {
    if (lines[i][0] > lines[j][0] && lines[i][1] > lines[j][1])
      dp[i] = Math.max(dp[i], dp[j] + 1);
  }
  ans = Math.max(ans, dp[i]);
}

// LDS
for (let i = 1; i < n; i++) {
  dp_dec[i] = 1;
  for (let j = 0; j < i; j++) {
    if (lines[i][0] < lines[j][0] && lines[i][1] < lines[j][1]) {
      dp_dec[i] = Math.max(dp_dec[i], dp_dec[j] + 1);
    }
  }
  ans = Math.max(ans, dp_dec[i]);
}

console.log(n - ans);
