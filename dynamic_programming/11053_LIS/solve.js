const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const num_arr = [0].concat(arr.split(" ").map(Number));

// N=1 => 1 ; 10
// N=2 => 2 ; 10 20
// N=3 => 2 ; 10 20 ( 10 등장 )
// N=4 => 3 ; 10 20 30 ( 30 등장 )
// N=5 => 3 ; 10 20 30 ( 20 등장 )
// N=6 => 4 ; 10 20 30 50 ( 50 등장 )

// 가장 긴 증가하는 부분수열
const dp = [0, 1];

let ans = 1;

// dp[i] = i번째 값으로 끝나는 가장 긴 증가하는 부분수열
for (let i = 2; i <= n; i++) {
  dp[i] = 1;
  for (let j = 0; j < i; j++) {
    if (num_arr[j] < num_arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
  ans = Math.max(dp[i], ans);
}
// console.log(dp);
console.log(ans);
