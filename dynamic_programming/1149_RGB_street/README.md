# RGB 거리 - DP

[1149 RGB 거리](https://www.acmicpc.net/problem/1149)

DP

DP(n, color) = min(DP(n-1, diff_color1), DP(n-1, diff_color2)) + color_cost

| 제출 번호 | 아이디 | 문제 | 결과         | 메모리 | 시간 | 언어           | 코드 길이 |
| --------- | ------ | ---- | ------------ | ------ | ---- | -------------- | --------- |
| 43288218  | bonyyy | 1149 | 맞았습니다!! | 9660   | 128  | node.js / 수정 | 832       |
