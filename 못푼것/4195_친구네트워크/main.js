const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [T, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

function count(F, testcase) {
  console.log(F, testcase);
  const nodes = new Set();
  const edges = {};

  for (let i in testcase) {
    const [f1, f2] = testcase[i].split(" ");
    nodes.add(f1);
    nodes.add(f2);
  }
}

let F = 0;
let testcase = [];
for (let i = 0; i < T; i++) {
  F = arr.shift();

  testcase = arr.slice(0, F);
  arr = arr.slice(F);
  count(F, testcase);
}
