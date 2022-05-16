const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

let [n, money] = N.split(" ").map(Number);
const num_arr = arr.map(Number).reverse();
// console.log(n, money, num_arr);

let ans = 0;

for (let cash of num_arr) {
  ans += parseInt(money / cash);
  money -= parseInt(money / cash) * cash;
  if (money < 0) break;
}

console.log(ans);
