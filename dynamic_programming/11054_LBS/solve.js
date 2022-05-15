const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const num_arr = [0].concat(arr.split(" ").map(Number));
const num_arr_flip = [0].concat(arr.split(" ").map(Number).reverse());

const dp = [0, 1];
const dp_flip = [0, 1];

// dp[i] = i번째 값으로 끝나는 가장 긴 증가하는 부분수열
for (let i = 2; i <= n; i++) {
  dp[i] = 1;
  dp_flip[i] = 1;
  for (let j = 0; j < i; j++) {
    if (num_arr[j] < num_arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);

    if (num_arr_flip[j] < num_arr_flip[i])
      dp_flip[i] = Math.max(dp_flip[i], dp_flip[j] + 1);
  }
  // ans = Math.max(dp[i], ans);
}

let ans = 1;

dp.shift();
dp_flip.reverse().pop();

// console.log(dp, dp_flip);
for (let i = 0; i < n; i++) {
  ans = Math.max(dp[i] + dp_flip[i] - 1, ans);
}

console.log(ans);
