const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function fibo(n) {
  if (n == 2) return 1;
  if (n == 1) return 1;
  if (n == 0) return 0;

  return fibo(n - 1) + fibo(n - 2);
}

rl.on("line", function (line) {
  const num = Number(line);
  console.log(fibo(num));
  rl.close();
}).on("close", function () {
  process.exit();
});
