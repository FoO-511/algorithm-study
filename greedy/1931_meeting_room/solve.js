const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
let meetings = arr.map((v) => v.split(" ").map(Number));

// 시작시간=종료시간인 경우를 고려해야함
// [6, 10]과 [10, 10] 중 [6, 10]을 먼저 실행하면
// [10, 10] 실행가능 하지만 역은 불가
meetings = meetings.sort((a, b) => a[0] - b[0]);
meetings = meetings.sort((a, b) => a[1] - b[1]);

let ans = 1;
let prev_end = meetings[0][1];

for (let i = 1; i < n; i++) {
  const [start, end] = meetings[i];
  if (prev_end <= start) {
    ans++;
    prev_end = end;
  }
}

console.log(ans);
