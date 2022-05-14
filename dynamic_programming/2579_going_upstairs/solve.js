const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
const score = [0].concat(arr.map(Number));

// i번째 계단에 오를 때, 몇 개의 연속한 계단을 올랐는지를 고려하여 부분문제를 정의해봅시다.
// dp[i] = max(dp[i - 2] + score[i], dp[i - 3] + score[i] + score[i - 1]);

// dp[0] = 아무 계단도 밟지 않음.
// dp[1] = 1번째 계단을 밟은 상태
const dp = [0, score[1], score[1] + score[2]];

for (let i = 3; i <= n; i++) {
  // dp[i - 2] + score[i] 지난 계단에서 한칸 뛴 상태
  // dp[i - 3] + score[i] + score[i - 1] 지지난 계단에서 한칸 뛰고 두칸
  // console.log(
  //   `dp[${i}] = max(dp[${i - 2}] + score[${i}](=${score[i]}) , dp[${
  //     i - 3
  //   }] + score[${i}](=${score[i]}) + score[${i - 1}](=${score[i - 1]}))`
  // );
  dp[i] = Math.max(dp[i - 2] + score[i], dp[i - 3] + score[i] + score[i - 1]);
}

console.log(dp[n]);
