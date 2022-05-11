const filePath = process.platform === "linux" ? "/dev/stdin" : "./test2.txt";

let [N, ...commands] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
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
  push_back(data) {
    const node = new Node(data);
    if (this.empty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = this.tail.next;
    }
    this.size++;
  }
  push_front(data) {
    const node = new Node(data);
    if (this.empty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }
  pop_front() {
    if (this.empty()) return -1;
    const ret = this.head.data;
    this.head = this.head.next;
    this.size--;
    return ret;
  }

  pop_back() {
    if (this.empty()) return -1;
    const ret = this.tail.data;
    this.tail = this.tail.prev;
    this.size--;
    return ret;
  }
  front() {
    if (this.empty()) return -1;
    return this.head.data;
  }
  back() {
    if (this.empty()) return -1;
    return this.tail.data;
  }
}

const q = new Queue();
const ans = [];

for (let i = 0; i < parseInt(N); i++) {
  const command = commands[i].split(" ");
  switch (command[0]) {
    case "push_back":
      q.push_back(command[1]);
      break;
    case "push_front":
      q.push_front(command[1]);
      break;
    case "pop_back":
      ans.push(q.pop_back());
      break;
    case "pop_front":
      ans.push(q.pop_front());
      break;
    case "size":
      ans.push(q.size);
      break;
    case "empty":
      ans.push(q.empty());
      break;
    case "front":
      ans.push(q.front());
      break;
    case "back":
      ans.push(q.back());
      break;
    default:
      break;
  }
}

console.log(ans.join("\n"));
