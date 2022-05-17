const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let ans = 0;
const n = Number(N);
let times = arr
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let min_times = [times[0]];
ans = min_times[0];

for (let i = 1; i < n; i++) {
  min_times[i] = min_times[i - 1] + times[i];
  ans += min_times[i];
}

console.log(ans);
