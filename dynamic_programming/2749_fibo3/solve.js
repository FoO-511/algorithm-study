const n = BigInt(require("fs").readFileSync("./test.txt").toString());

let max = 15 * 10 ** 5;
max = n % BigInt(max);

const fibo = new Array(parseInt(max) + 1).fill(BigInt(-1));
fibo[0] = 0;
fibo[1] = 1;
fibo[2] = 1;

// 피보나치 수열을 10^k로 나눈 나머지의 주기는 항상 15 * 10 ^(k-1)
// 피사노 주기

// 문제에서 k는 6
// 따라서 나머지는 15 * 10^5 주기로 반복
// N은 1000000000000000000인데 이를 다 구할 수 없음.
// N을 15 * 10^5로 나눈 나머지 번째까지 그 나머지를 구하면 됨.

const tmp = n % BigInt(max);

for (let i = 3; i <= parseInt(max); i++) {
  // 사실 여기서 나머지를 구하고 그 다음 연산에 써먹어도 된다는게 이해가 안감.
  fibo[i] = (fibo[i - 1] + fibo[i - 2]) % 1000000;
}

console.log(fibo[parseInt(max)] % 1500000);
