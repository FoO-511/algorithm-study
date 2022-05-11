let [n, ...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

n = Number(n);

function Node(v) {
  this.v = v;
  this.children = [];
}

const start = new Node("start");
let pointer = start;
let depth_count = 1;

for (let i in arr) {
  pointer = start;
  let [depth, ...info] = arr[i].split(" ");
  depth = Number(depth);
  for (let j = 0; j < depth; j++) {
    const isExist = pointer.children.find((child) => child.v === info[j]);
    if (isExist) {
      pointer = isExist;
    } else {
      const newNode = new Node(info[j]);
      pointer.children.push(newNode);
      pointer = newNode;
    }
  }
}

let visited = [];
let will_visit_child = [[-1, start]];

while (will_visit_child.length > 0) {
  let [print_count, current] = will_visit_child.pop();
  let str = "";

  if (print_count > -1) {
    for (let i = 0; i < print_count; i++) {
      str += "--";
    }
    str += current.v;
    console.log(str);
  }

  if (current.children.length > 0) {
    current.children = current.children.sort(function (a, b) {
      if (a.v > b.v) return -1;
      else return 1;
    });
    for (let i of current.children) {
      will_visit_child.push([print_count + 1, i]);
    }
  }
}
