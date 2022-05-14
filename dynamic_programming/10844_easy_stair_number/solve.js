const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const N = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "");
// .split("\n");
const n = Number(N);

// N = 1 : 1,2,3,4,5,6,7,9 (9개)
// N = 2 : 12, 21, 23, 24, 32, 34, 54, 56,... (9 + (9 - 2) = 16)
// N = 3 : 121, 212 ...

// 이전 단계에서 끝이 1인것과 9인 것의 개수를 알아야 함.
// 그걸 알려면 끝이 2인 것과 8인 것의 개수를....
// N = 1에서 2인 것과 8인 것 2개
// N = 2에서 2인 것과 8인 것은 4개

const dp = new Array(10).fill(0).map((v) => [0, 1]);
dp[0] = [0, 0];

for (let i = 2; i <= n; i++) {
  for (let num = 1; num < 9; num++) {
    dp[num][i] =
      (BigInt(dp[num - 1][i - 1]) + BigInt(dp[num + 1][i - 1])) %
      BigInt(1000000000);
  }
  dp[0][i] = dp[1][i - 1];
  dp[9][i] = dp[8][i - 1];
}

// console.log(dp);

let ans = 0;
for (let i in dp) {
  ans = (BigInt(ans) + BigInt(dp[i][n])) % BigInt(1000000000);
}

console.log(ans.toString());
