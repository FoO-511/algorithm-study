# 숫자 카드 2 - binary search(lower bound, upper bound)

[10816 숫자 카드 2](https://www.acmicpc.net/problem/10816)

이진 탐색

lower bound

- 찾고자 하는 값 이상의 값이 처음으로 나타나는 위치
- num <= arr[mid] ? end = mid : start = mid + 1;

upper bound

- 찾고자 하는 값 초과한 값이 처음으로 나타나는 위치
- num < arr[mid] 일 때 end = mid : start = mid + 1;

| 제출 번호 | 아이디 | 문제  | 결과         | 메모리 | 시간 | 언어           | 코드 길이 |
| --------- | ------ | ----- | ------------ | ------ | ---- | -------------- | --------- |
| 43106826  | bonyyy | 10816 | 맞았습니다!! | 158636 | 1324 | node.js / 수정 | 1141      |
