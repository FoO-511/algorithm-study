let ans;

const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N_M, ...map] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const [n, m] = N_M.split(" ").map(Number);

const [dx, dy] = [
  [1, 0, -1, 0],
  [0, -1, 0, 1],
];

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  push(data) {
    const node = new Node(data);
    if (this.length == 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.length++;
  }
  pop() {
    if (this.length == 0) return false;
    this.length--;
    const ret = this.head.data;
    this.head = this.head.next;
    return ret;
  }
}

// count: 한번도 파괴한적 없을 때
const count = new Array(n)
  .fill(0)
  .map((v) => new Array(m).fill(0).map((v) => [0, 0])); // [안부순곳, 부순곳]

function isInMap([y, x]) {
  return x >= 0 && y >= 0 && y < n && x < m ? true : false;
}

function bfs() {
  const q = new Queue();
  q.push([0, 0, 0]); // [y, x, 부술수 있는가 여부]
  count[0][0][0] = 1;
  count[0][0][1] = 1;

  while (q.length > 0) {
    const [y, x, isBroken] = q.pop();
    // console.log(y, x, m - 1, n - 1);

    if (x == m - 1 && y == n - 1) {
      return count[y][x][isBroken];
    }

    // console.log(isBroken);

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (!isInMap([ny, nx])) continue;
      if (count[ny][nx][isBroken]) continue;
      // 부순적 있는데 부순적 있는 월드에서 해당 칸에 온적 있으면 걍 건너뜀
      // 부순적 없고 부순적 없는 월드에서 해당 칸에 온적 있으면 걍 건너뜀

      if (map[ny][nx] == 0) {
        count[ny][nx][isBroken] = count[y][x][isBroken] + 1;
        q.push([ny, nx, isBroken]);
      } else if (!isBroken) {
        count[ny][nx][1] = count[y][x][isBroken] + 1;
        q.push([ny, nx, 1]);
      }
    }
  }
  return -1;
}

ans = bfs();
// console.log(count);

console.log(ans);
