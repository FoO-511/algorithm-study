const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const [nm, ...arr] = input;
  const [n, m] = nm.split(" ").map(Number);

  const parent = new Array(n + 1).fill(0).map((v, index) => index);

  function find(x) {
    if (parent[x] == x) return x;
    return (parent[x] = find(parent[x]));
  }

  function union(x, y) {
    x = find(x);
    y = find(y);
    parent[x] = y;
  }

  for (let i = 0; i < m; i++) {
    const [command, a, b] = arr[i].split(" ").map(Number);
    if (command == 0) {
      union(a, b);
    } else {
      if (find(a) == find(b)) console.log("YES");
      else console.log("NO");
    }
  }
}
