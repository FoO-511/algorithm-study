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

function binary_search(n, num) {
  let start = 0;
  let end = n - 1;
  let mid = 0;
  while (end - start >= 0) {
    mid = parseInt((start + end) / 2);

    if (n_arr[mid] == num) {
      return mid;
    } else if (n_arr[mid] > num) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return false;
}

for (let i of m_arr) {
  let hasCard = binary_search(N, i);
  let count = 1;

  if (hasCard === false) {
    ans.push(0);
  } else {
    let idx = hasCard + 1;
    while (idx < N && n_arr[idx] == i) {
      count++;
      idx++;
    }

    idx = hasCard - 1;
    while (idx >= 0 && n_arr[idx] == i) {
      count++;
      idx--;
    }
    ans.push(count);
  }
}

console.log(ans.join(" "));
