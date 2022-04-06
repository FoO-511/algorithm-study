let fs = require("fs");

const [...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

let dots = [];
let x = [];
let y = [];
for (let i of arr) {
  let arr = i.split(" ");
  x.push(Number(arr[0]));
  y.push(Number(arr[1]));
}

const a = x[0] * y[1] + x[1] * y[2] + x[2] * y[0];
const b = x[1] * y[0] + x[2] * y[1] + x[0] * y[2];

if (a - b > 0) {
  console.log(1);
} else if (a == b) {
  console.log(0);
} else {
  console.log(-1);
}
