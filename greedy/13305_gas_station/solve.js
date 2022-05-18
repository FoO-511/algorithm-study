const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let n = Number(N);
let kms = arr[0].split(" ").map((v) => BigInt(Number(v)));
let costs = arr[1].split(" ").map((v) => BigInt(Number(v)));

// console.log(kms, costs);
let ans = 0n;

let cur_cost = costs[0];

for (let i = 0; i < n - 1; i++) {
  ans += kms[i] * cur_cost;

  if (costs[i + 1] < cur_cost) cur_cost = costs[i + 1];
}

console.log(ans.toString());
