const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [N, ...arr] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(N);
arr = arr.map((v) => v.split(" ").map(Number));

for (let i = 1; i < n; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    if (j == 0) arr[i][j] += arr[i - 1][0];
    else if (j == arr[i].length - 1) arr[i][j] += arr[i - 1][j - 1];
    else {
      arr[i][j] += Math.max(arr[i - 1][j - 1], arr[i - 1][j]);
    }
  }
}

// console.log(arr);
console.log(Math.max(...arr[n - 1]));
