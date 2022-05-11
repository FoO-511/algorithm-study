const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = require("fs").readFileSync(filePath).toString().trim();
N = parseInt(N);

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  empty() {
    return this.size === 0 ? 1 : 0;
  }
  push(data) {
    const node = new Node(data);
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = this.tail.next;
    }
    this.size++;
  }
  pop() {
    if (this.empty()) return 0;
    const ret = this.head.data;
    this.head = this.head.next;
    this.size--;

    return ret;
  }
}

const q = new Queue();

for (let i = 1; i <= N; i++) {
  q.push(i);
}

while (q.size > 1) {
  q.pop();
  q.push(q.pop());
}

console.log(q.head.data + "");
