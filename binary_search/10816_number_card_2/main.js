const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [N, n_arr, M, m_arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

N = Number(N);
M = Number(M);
n_arr = n_arr
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

m_arr = m_arr.split(" ").map(Number);

const ans = [];

function lowerbound(n, num) {
  let lo = 0;
  let hi = n;

  while (lo < hi) {
    let mid = parseInt((lo + hi) / 2);

    if (num <= n_arr[mid]) {
      // 현재 위치 값보다 num이 작거나 같을 경우
      // 현재 위치에 num이 있더라도 좌측 구간을 계속 탐색.
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
}

function upperbound(n, num) {
  let lo = 0;
  let hi = n;

  while (lo < hi) {
    let mid = parseInt((lo + hi) / 2);
    if (num < n_arr[mid]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
}

for (let i of m_arr) {
  const upper = upperbound(N, i);
  const lower = lowerbound(N, i);
  if (upper == lower) ans.push(0);
  else {
    ans.push(upper - lower);
  }
}

console.log(ans.join(" "));
