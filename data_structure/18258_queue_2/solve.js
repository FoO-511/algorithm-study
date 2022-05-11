const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [N, ...commands] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

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
  front() {
    return this.empty() ? -1 : this.head.data;
  }
  back() {
    return this.empty() ? -1 : this.tail.data;
  }
  push(data) {
    if (this.empty()) {
      this.head = new Node(data);
      this.tail = this.head;
      this.size++;

      return;
    }
    this.tail.next = new Node(data);
    this.tail = this.tail.next;
    if (this.size == 1) {
      this.head.next = this.tail;
    }
    this.size++;
  }
  pop() {
    if (!this.empty()) {
      const ret = this.head.data;
      this.head = this.head.next;
      this.size--;
      return ret;
    }
    return -1;
  }
}

const q = new Queue();
const ans = [];

for (let i = 0; i < parseInt(N); i++) {
  const command = commands[i].split(" ");
  switch (command[0]) {
    case "push":
      q.push(parseInt(command[1]));
      break;
    case "front":
      ans.push(q.front());
      break;
    case "back":
      ans.push(q.back());
      break;
    case "size":
      ans.push(q.size);
      break;
    case "empty":
      ans.push(q.empty());
      break;
    case "pop":
      ans.push(q.pop());
      break;
    default:
      break;
  }
}

console.log(ans.join("\n"));
