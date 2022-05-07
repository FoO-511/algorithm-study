const [R_C, ...rest] = require("fs")
  .readFileSync("./test2.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const xd = [1, 0, -1, 0]; // d stands for direction
const yd = [0, -1, 0, 1];

const [R, C] = R_C.split(" ").map((v) => Number(v)); // 동굴 행과 열
const cave = rest.slice(0, R).map((v) => v.split("")); // 동굴 맵
cave.push(new Array(C).fill("x")); // 땅을 "x"로 채움
// console.log("start cave", cave);

const throw_cnt = parseInt(rest[R]); // 던지는 횟수
const throws = rest[R + 1].split(" ").map((v) => Number(v)); // 던진 높이들

class Queue {
  constructor() {
    this.array = [];
  }
  push(item) {
    this.array.push(item);
  }
  pop() {
    const ret = this.array[0];
    this.array = this.array.slice(1);
    return ret;
  }
  top() {
    return this.array[0];
  }
  isEmpty() {
    if (this.array.length == 0) return true;
    return false;
  }
}

const stable_cluster = new Array(R + 1)
  .fill(0)
  .map((v) => new Array(C).fill(false));

function get_stable_cluster() {
  const q = new Queue();
  q.push([0, R]);

  stable_cluster.map((v) => v.fill(false));

  while (!q.isEmpty()) {
    const current = q.pop();
    for (let i = 0; i < 4; i++) {
      const [tmp_y, tmp_x] = [current[1] + yd[i], current[0] + xd[i]];
      if (
        isInCave([tmp_x, tmp_y]) &&
        stable_cluster[tmp_y][tmp_x] == false &&
        cave[tmp_y][tmp_x] == "x"
      ) {
        // 근데 그 노드에 미네랄이 있을 때
        q.push([tmp_x, tmp_y]);
        stable_cluster[tmp_y][tmp_x] = true;
      }
    }
  }
}

function isClusterStable() {
  get_stable_cluster();

  for (let x = 0; x < C; x++) {
    for (let y = 0; y < R; y++) {
      if (cave[y][x] == "x" && stable_cluster[y][x] == false) return false;
    }
  }
  return true;
}

function isInCave([x, y]) {
  if (x >= 0 && y >= 0 && x < C && y <= R) {
    return true;
  }
  return false;
}

function throw_stick(turn, h) {
  let x = 0;
  const y = R - h;

  if (turn == 0) {
    // 왼 -> 오
    while (isInCave([x, y]) && cave[y][x] != "x") x++;
  } else {
    // 오 -> 왼
    x = C - 1;
    while (isInCave([x, y]) && cave[y][x] != "x") x--;
  }

  if (isInCave([x, y])) cave[y][x] = ".";
  // console.log(`[turn ${turn}] - height: ${h}\n`, cave);
}

function get_dist_to_fall() {
  let min_dist = R;

  for (let x = 0; x < C; x++) {
    for (let y = R; y > 0; y--) {
      if (cave[y][x] != "x" || !stable_cluster[y][x]) continue;

      let dist = 0;

      for (let k = y - 1; k >= 0; k--) {
        if (cave[k][x] == "x") {
          if (!stable_cluster[k][x])
            min_dist = dist < min_dist ? dist : min_dist;
          break;
        } else dist++;
      }
    }
  }

  return min_dist;
}

function drag_down_unstable_cluster(dist) {
  for (let x = 0; x < C; x++) {
    for (let y = R; y >= 0; y--) {
      if (cave[y][x] == "x" && !stable_cluster[y][x]) {
        cave[y + dist][x] = "x";
        cave[y][x] = ".";
      }
    }
  }

  // console.log(`[drag down ${dist}]\n`, cave);
}

function gravity() {
  drag_down_unstable_cluster(get_dist_to_fall());
}

let turn = 0;
for (let h of throws) {
  throw_stick(turn, h);
  if (!isClusterStable()) gravity();
  turn ^= 1;
}

// let ans = "";

for (let y = 0; y < R; y++) {
  for (let x = 0; x < C; x++) {
    // ans += cave[y][x];
    process.stdout.write(cave[y][x]);
  }
  // ans += "\n";
  process.stdout.write("\n");
}
// console.log(ans);
