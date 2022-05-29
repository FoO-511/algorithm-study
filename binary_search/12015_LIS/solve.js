const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

// const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
let ans;

function lower_bound(arr, key) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    let mid = parseInt((start + end) / 2);
    if (arr[mid] < key) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return end;
}

function solution(arr) {
  const n = arr.length;
  const LIS = [arr[0]];

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    if (arr[i] > LIS[LIS.length - 1]) LIS.push(key);
    else {
      replace_idx = lower_bound(LIS, key);
      LIS[replace_idx] = key;
    }
  }

  return LIS.length;
}

ans = solution(arr);

console.log(ans);
