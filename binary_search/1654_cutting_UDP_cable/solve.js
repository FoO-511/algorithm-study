let ans;

const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [KN, ...cables] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

function count_new_cables(length, cables) {
  let count = 0;
  for (let cable of cables) {
    count += parseInt(cable / length);
  }

  return count;
}

// 숫자값 입력 전제
function solution(k, n, cables) {
  // let ans = parseInt(cables.reduce((a, b) => a + b) / n);
  // n은 5인데 cables=[1, 1, 800, 800]
  let ans = Math.max(...cables);

  let end = ans;
  let start = 1;

  // 이때 end, start, mid는 길이.
  // start < end로 하고, start - 1을 리턴하였을 때 틀림.
  // 최초로 초과한 값인 upper bound를 구한 뒤 1을 빼서 리턴했는데
  // 어디가 문제임..??
  while (start <= end) {
    mid = parseInt((start + end) / 2);
    if (n > count_new_cables(mid, cables)) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end;
}

const [K, N] = KN.split(" ").map(Number);
ans = solution(K, N, cables.map(Number));

console.log(ans);
