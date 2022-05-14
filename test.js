const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const N = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "");
// .split("\n");
const n = Number(N);
