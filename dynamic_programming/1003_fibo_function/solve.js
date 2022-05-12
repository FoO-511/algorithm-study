const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [T, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

T = Number(T);
const count01 = [
  [1, 0],
  [0, 1],
];

function fibo(num) {
  if (count01[num]) return count01[num];
  count01[num] = [
    fibo(num - 1)[0] + fibo(num - 2)[0],
    fibo(num - 1)[1] + fibo(num - 2)[1],
  ];

  return count01[num];
}

const ans = [];

for (let i = 0; i < T; i++) {
  const num = Number(arr[i]);
  ans.push(fibo(num).join(" "));
}

console.log(ans.join("\n"));
