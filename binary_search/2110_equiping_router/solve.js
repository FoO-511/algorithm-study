const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const [N, C] = input.shift().split(" ").map(Number);
let houses = input.map(Number).sort((a, b) => a - b);
let ans;

function count(houses, dist) {
  let end_pos = houses[0];
  // 집 좌표의 제일 첫 번째 값으로 end_pos 초기화
  let count = 1;
  for (let i = 0; i < houses.length; i++) {
    // dist = mid
    if (houses[i] - end_pos >= dist) {
      count++;
      end_pos = houses[i];
    }
  }

  return count;
}

// n = 집의 개수, c = 공유기의 개수
function solution(n, c, houses) {
  let ans = 0;

  let start = 1;
  let end = houses[houses.length - 1];

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    if (count(houses, mid) >= c) {
      ans = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return ans;
}

ans = solution(N, C, houses);

console.log(ans);
