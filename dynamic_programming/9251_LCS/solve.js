const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const words = arr;
// 크기가 큰 것이 앞
const dp = new Array(words[0].length + 1)
  .fill(0)
  .map((v) => new Array(words[1].length + 1).fill(null));

dp[0].fill(0);

for (let i of dp) {
  i[0] = 0;
}

let ans = 0;

for (let i = 1; i <= words[0].length; i++) {
  for (let j = 1; j <= words[1].length; j++) {
    if (words[0][i - 1] == words[1][j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }

    ans = Math.max(ans, dp[i][j]);
  }
}
// console.log(dp, words);

console.log(ans);
