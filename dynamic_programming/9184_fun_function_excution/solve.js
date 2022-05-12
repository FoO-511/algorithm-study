const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

// trim()추가하니까 맞음.. 킹킹킹
const abcs = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const arr = {};

function w(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  else if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
  const key = `${a}_${b}_${c}`;

  if (arr[key] !== undefined) return arr[key];

  if (a < b && b < c) {
    arr[key] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
  } else {
    arr[key] =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1);
  }
  return arr[key];
}
const ans = [];

for (let i = 0; i < abcs.length - 1; i++) {
  const [a, b, c] = abcs[i].split(" ").map(Number);
  console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
}
