const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const exp = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("-")
  .map((v) =>
    v
      .split("+")
      .map(Number)
      .reduce((a, b) => a + b)
  );

let ans = exp.shift();
let num = 0;
let tmp = "";

ans -= exp.length > 0 ? exp.reduce((a, b) => a + b) : 0;

console.log(ans);
