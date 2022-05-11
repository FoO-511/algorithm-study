//  11286 절대값 힙

class PQ {
  constructor() {
    this.heap = [null];
    this.size = 0;
  }
  compare(a, b) {
    if (a ** 2 == b ** 2) {
      return a < b ? true : false;
    }
    return a ** 2 < b ** 2 ? true : false;
  }

  push(node) {
    let cur = ++this.size;
    // this.heap[this.size] = node;
    // 새 노드가 부모보다 우선순위가 높으면 부모를 자식자리에 복사
    while (cur != 1 && this.compare(node, this.heap[parseInt(cur / 2)])) {
      this.heap[cur] = this.heap[parseInt(cur / 2)];
      cur = parseInt(cur / 2);
    }
    this.heap[cur] = node;
  }
  pop() {
    if (this.size === 0) return 0;
    const ret = this.heap[1];
    let tmp = this.heap[this.size--];
    let parent = 1;
    let child = 2;

    while (child <= this.size) {
      if (!this.compare(this.heap[child], this.heap[child + 1])) child += 1;

      if (this.compare(tmp, this.heap[child])) break;

      this.heap[parent] = this.heap[child];
      parent = child;
      child = parseInt(parent * 2);
    }
    this.heap[parent] = tmp;

    return ret;
  }
}
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test2.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);

const pq = new PQ();

const ans = [];

for (let i = 0; i < n; i++) {
  const num = Number(arr[i]);
  if (num == 0) ans.push(pq.pop());
  else {
    pq.push(num);
  }
}

console.log(ans.join("\n"));
