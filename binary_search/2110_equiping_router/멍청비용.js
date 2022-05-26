let ans;

const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";

const [NC, ...house_poss] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .replaceAll("\r", "")
  .split("\n");

function upper_bound([start, end], houses, target) {
  // 중앙값이 타겟보다 크면 타겟보다 더 작은값 탐색하는 upper_bound
  while (start < end) {
    const mid = Math.min((start + end) / 2);
    if (houses[mid] < target) {
      start = mid;
    } else {
      end = mid - 1;
    }
  }
  return start;
}

function lower_bound([start, end], houses, target) {
  while (start < end) {
    const mid = Math.min((start + end) / 2);
    if (houses[mid] < target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return start;
}

function get_approx_mid([start, end], houses) {
  const target = parseInt((houses[start] + houses[end]) / 2);
  let mid = parseInt((start + end) / 2);
  if (houses[mid] == target)
    return [mid, houses[end] - target]; // inx, 최근접점
  else if (houses[mid] > target) {
    // 중앙값이 타겟보다 크면 타겟보다 더 작은값 탐색하는 upper_bound
    mid = upper_bound([start, mid], houses, target);
  } else if (houses[mid] < target) {
    // 중앙값이 타겟보다 작으면 더 큰값 탐색하는 lower_bound
    mid = lower_bound([mid, end], houses, target) - 1;
  }
  const target_small_dist = target - houses[mid];
  const target_far_dist = houses[mid + 1] - target;

  return target_small_dist < target_far_dist ? mid : mid + 1;
}

function incert_router(routers, houses) {
  // console.log("before routers", routers);
  let most_nearist_dist = 0;
  let ans = false;
  for (let i = 1; i < routers.length; i++) {
    const [start, end] = [routers[i - 1], routers[i]];
    if (start + 1 == end) continue;
    const mid = get_approx_mid([start, end], houses);
    const nearist_dist = Math.max(
      houses[end] - houses[mid],
      houses[mid] - houses[start]
    );

    if (nearist_dist >= most_nearist_dist) {
      most_nearist_dist = nearist_dist;
      ans = [start, mid, end];
    }
  }
  if (ans) {
    routers.splice(routers.indexOf(ans[0]) + 1, 0, ans[1]);
    // console.log("[start, mid, end]", ans);
    // console.log("splice params", ans[0] + 1, 0, ans[1]);
  }
  // console.log("after routers", routers);
}

function get_nearist_dist(routers, houses) {
  // console.log("routers", routers);
  let dist = Math.max(...houses);
  for (let i = 1; i < routers.length; i++) {
    dist = Math.min(dist, houses[routers[i]] - houses[routers[i - 1]]);
    // console.log(
    //   routers[i],
    //   routers[i - 1],
    //   houses[routers[i]],
    //   houses[routers[i - 1]]
    // );
  }
  return dist;
}

// n = 집의 개수, c = 공유기의 개수
function solution(n, c, houses) {
  let ans = Math.max(...houses);

  const routers = [0, houses.length - 1];
  // console.log(routers);

  for (let i = 0; i < c - 2; i++) {
    incert_router(routers, houses);
    // console.log(routers);
  }
  ans = get_nearist_dist(routers, houses);
  return ans;
}

const [N, C] = NC.split(" ").map(Number);

ans = solution(
  N,
  C,
  house_poss.map(Number).sort((a, b) => a - b)
);

console.log(ans);
