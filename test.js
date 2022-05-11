const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [N] = require("fs").readFileSync(filePath).toString().trim();
// .replaceAll("\r", "")
// .split("\n");

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
    if (!this.head) {
      this.head = node;
      this.head.next = this.tail;
    }
  }
  pop() {
    if (!this.empty()) {
      const ret = this.head.data;
      this.head = this.head.next;
      if (this.size == 2) {
        this.head.next == null;
      }
      this.size--;
      return ret;
    }
    return -1;
  }
}

const q = new Queue();

for (let i = 1; i <= N; i++) {
  q.push(i);
}

// function log_q() {
//   let tmp = q.head;
//   let tmp2 = [];
//   while (true) {
//     tmp2.push(tmp.data);
//     if (tmp.next == null) break;
//     tmp = tmp.next;
//   }
//   console.log(tmp2.join(" "));
// }
// log_q();

while (q.size > 1) {
  q.pop();
  q.push(q.pop());
  // log_q();
}

console.log(q.head.data + "");
