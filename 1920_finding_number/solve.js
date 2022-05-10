const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [N, n_arr, M, m_arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

N = Number(N);
M = Number(M);
n_arr = new Set(n_arr.split(" ").map(Number));
m_arr = m_arr.split(" ").map(Number);

const ans = [];
for (let i of m_arr) {
  if (n_arr.has(i)) ans.push(1);
  else ans.push(0);
}

console.log(ans.join("\n"));
