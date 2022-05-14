const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const N = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "");
// .split("\n");

let n = Number(N);

// 3으로 나눠떨어지지 않는 경우
// -1 후 /3 (연산 2회)
// --> 그 뒤 3이나 2로 나눠떨어지는 상태면 럭키
// 아니면 또 빼고 연산.. 운이 나쁘면 연산 회수만 배로 늘어남.
// -1 -1 후 /3(연산 3회)

// dp[0] = 0
// dp[1] = 0
// dp[2] = 1 (/2)
// dp[3] = 1 (/3)
// dp[4] = 2 (/2 /2 , -1 /3)
// dp[5] = 3 (-1 /2 /2 , -1 -1 /3)
// dp[6] = 2 (/3 /2)
// dp[7] = 3 (-1 /3 /2)
// dp[8] = 3 (/2 /2 /2)
// dp[9] = 2 (/3 /3)
// dp[10] = 3 (-1 /3 /3)
// dp[11] = 4 (-1 -1 /3 /3, -1 /2 -1 /2 /2) -1 한번만 하면 5회 연산해야 함.
// dp[12] = 3 (/3 /2 /2)
// dp[13] = 4 (-1 /3 /2 /2)
// dp[15] = 4 (/3 -1 /2 /2)

// i % 3 !== 0 && i % 2 !== 0

const dp = [0, 0, 1];

// else if를 사용할 경우 공배수인 경우를 건너뜀.
for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + 1;

  if (i % 3 == 0) {
    dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }
  if (i % 2 == 0) {
    dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }
}

console.log(dp[n]);
