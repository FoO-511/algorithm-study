const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

let [T, ...test_cases] = require("fs")
  .readFileSync(filePath)
  .toString()
  .replaceAll("\r", "")
  .split("\n");

T = Number(T);

let parents = [];
let sizes = [];
const ans = [];

function find(x) {
  if (parents[x] === x) return x;
  return (parents[x] = find(parents[x]));
}

function union(x, y) {
  x = find(x);
  y = find(y);
  if (x == y) return;

  sizes[x] += sizes[y];
  parents[y] = x;
}

function test(count, start) {
  const map = {};
  // 배열 크기를 count*2로 해서 틀림... 아오
  sizes = new Array(count * 2 + 1).fill(1);
  parents = new Array(count * 2 + 1).fill(0).map((v, i) => i);

  let nodeNum = 1;
  const datas = test_cases.slice(start, start + count);
  for (let i = 0; i < count; i++) {
    let [a_name, b_name] = datas[i].split(" ");
    if (!map[a_name]) map[a_name] = nodeNum++;
    if (!map[b_name]) map[b_name] = nodeNum++;

    union(map[a_name], map[b_name]);

    ans.push(sizes[find(map[a_name])]);
  }
}

let count_idx = 0;
for (let i = 0; i < T; i++) {
  const count = parseInt(test_cases[count_idx]);
  test(count, count_idx + 1);
  count_idx += count + 1;
}

console.log(ans.join("\n"));
