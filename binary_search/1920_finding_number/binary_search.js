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

function binary_search(start, end, num) {
  if (end - start < 0) {
    return false;
  }

  const mid = parseInt((start + end) / 2);
  if (n_arr[mid] > num) {
    return binary_search(start, mid - 1, num);
  } else if (n_arr[mid] < num) {
    return binary_search(mid + 1, end, num);
  } else {
    return true;
  }
}

for (let i of m_arr) {
  ans.push(binary_search(0, N - 1, i) ? 1 : 0);
}

console.log(ans.join("\n"));
