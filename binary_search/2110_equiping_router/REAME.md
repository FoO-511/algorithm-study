# 랜선 자르기

[2110 랜선 자르기](https://www.acmicpc.net/problem/2110)

처음에는 시작과 끝 집의 중앙값과 가장 근접한 집을 찾아 내야 한다고 생각해, mid값과 중앙값을 비교하여 (==, <, >)의 세가지 결과에 따라 적절히 upper bound, lower bound를 통해 근사 중앙값을 탐색했다. (하루 꼬박 걸려서 구현..)

시간초과로 풀이를 찾아보니, 간격을 바꿔가며 그 간격이면 전체 집에 몇 개나 설치할 수 있는지 세 보면 되는 거였다.

| 제출 번호 | 아이디 | 문제 | 결과         | 메모리 | 시간 | 언어           | 코드 길이 |
| --------- | ------ | ---- | ------------ | ------ | ---- | -------------- | --------- |
| 43808996  | bonyyy | 2110 | 맞았습니다!! | 34676  | 292  | node.js / 수정 | 1035      |
