const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [subin, sis] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split(" ")
  .map(Number);

const count = new Array(1000000 + 1).fill(0);

class Queue {
  constructor() {
    this.length = 0;
    this.q = [];
    this.head = 0;
  }
  push(data) {
    this.length++;
    this.q.push(data);
  }
  pop() {
    if (this.length == 0) return false;
    this.length--;
    return this.q[this.head++];
  }
}
function isInMap(pos) {
  return pos >= 0 && pos <= 1000000 ? true : false;
}

function bfs(start, dest) {
  const q = new Queue();
  q.push(start);

  while (q.length > 0) {
    const cur = q.pop();
    // count[cur] = 0;
    if (cur == dest) return count[cur];

    const new_pos = [cur + 1, cur - 1, 2 * cur];
    for (let i of new_pos) {
      if (isInMap(i) && !count[i]) {
        q.push(i);
        count[i] = count[cur] + 1;
      }
    }
  }
}

function solution() {
  let ans = 0;
  ans = bfs(subin, sis);

  return ans;
}

let ans = solution();

console.log(ans);
