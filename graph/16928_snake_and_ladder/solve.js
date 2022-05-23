let ans;

const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N_M, ...ladder_snake] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const map = new Array(101).fill(0);
const to = [];

for (let i of ladder_snake) {
  to[i[0]] = i[1];
}

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

function bfs() {
  const q = new Queue();
  q.push(1);

  while (q.length > 0) {
    let cur = q.pop();
    if (to[cur]) {
      map[to[cur]] = map[cur];
      cur = to[cur];
    }

    if (cur == 100) return map[cur];

    for (let i = 1; i <= 6; i++) {
      const np = cur + i;
      if (!map[np] && np <= 100) {
        map[np] = map[cur] + 1;
        q.push(np);
      }
    }
  }
}

ans = bfs();

console.log(ans);
