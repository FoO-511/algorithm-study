const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

const n = Number(input.shift());
const arr = input.map((v) => v.split(" "));
// 흰색=0 / 파랑=1

// console.log(n, arr);

function compress(start, size) {
  const [y_start, x_start] = start;
  let ret = "";

  let start_color = arr[y_start][x_start];
  // console.log("start color", start_color, y_start, x_start);
  if (size == 1) return start_color;

  let isOneColor = true;

  for (let y = y_start; y < y_start + size; y++) {
    for (let x = x_start; x < x_start + size; x++) {
      if (arr[y][x] !== start_color) {
        isOneColor = false;
        break;
      }
    }
    if (!isOneColor) break;
  }

  if (!isOneColor) {
    const new_size = parseInt(size / 2);
    ret += "(";
    ret += compress([y_start, x_start], new_size); // 1사분면
    ret += compress([y_start, x_start + new_size], new_size); // 2사분면
    ret += compress([y_start + new_size, x_start], new_size); // 3사분면
    ret += compress([y_start + new_size, x_start + new_size], new_size); // 4사분면
    ret += ")";

    return ret;
  }

  return start_color;
}

function solution() {
  const quad_tree = compress([0, 0], n);
  let white = 0;
  let blue = 0;
  for (let i = 0; i < quad_tree.length; i++) {
    if (quad_tree[i] == "0") white++;
    else if (quad_tree[i] == "1") blue++;
  }
  return [white, blue];
}

ans = solution();

console.log(ans.join("\n"));
