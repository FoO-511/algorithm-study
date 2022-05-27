const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const [N, k] = input.map(Number);
let ans;

function count(N, num) {
  let count = 0;
  for (let i = 1; i <= N; i++) {
    count += Math.min(N, parseInt(num / i));
  }
  return count;
}

function solution(N, k) {
  let start = 1;
  let end = k;

  while (start <= end) {
    const mid = parseInt((start + end) / 2);
    if (count(N, mid) < k) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

ans = solution(N, k);

console.log(ans);
