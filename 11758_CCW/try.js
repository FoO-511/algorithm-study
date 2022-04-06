let fs = require("fs");

const [...arr] = require("fs")
  .readFileSync("./test.txt")
  .toString()
  .replaceAll("\r", "")
  .trim()
  .split("\n");

let dots = [];
let xs = [];
let ys = [];
for (let i of arr) {
  xs.push(Number(i[0]));
  ys.push(Number(i[2]));
}

third_dot_pos =
  (ys[0] - ys[1]) * xs[2] +
  (xs[1] - xs[0]) * ys[2] +
  xs[0] * ys[1] -
  xs[1] * ys[0];

if (third_dot_pos == 0) {
  console.log(0);
} else if (third_dot_pos > 0) {
  console.log(1);
} else {
  console.log(-1);
}
