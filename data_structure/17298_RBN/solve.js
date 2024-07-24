const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

// 오큰수 NGE(i)
// Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수
const n = Number(N);
let ans = new Array(n).fill(-1);
const nums = arr.split(" ").map(Number);
const stack = [];

for (let i = 0; i < n; i++) {
  while (stack.length > 0) {
    if (nums[stack[stack.length - 1]] < nums[i]) ans[stack.pop()] = nums[i];
    else break;
    // continue가 아닌 break인 이유는
    // 어차피 앞쪽의 값들은 모두 현재 스택 끝값보다 크기 때문
  }
  stack.push(i);
}

console.log(ans.join(" "));
