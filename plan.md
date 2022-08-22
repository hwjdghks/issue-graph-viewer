1. 주소 입력받음
2. 데이터 가공 함수 실행 (input URL, return JSON file)
3. 화면 출력 함수 실행 (input JSON file)

데이터 가공 함수 로직
1. 주소가 올바른 주소인지 확인(regex)
2. 입력받은 주소를 api 주소로 변환
3. 해당 주소로 api 요청 (동기, await 사용)
4. `headers`에서 `link` 항목 가져오기
5. `link`항목에서 전체 페이지 수 추출
6. 전체 페이지 수만큼 각 페이지의 데이터 요청 (비동기)
7. array에 요청 결과값 저장 (return Promise, Promise.all)
8. 각 인덱스의 값을 가공 후 병합


중요 로직  
url을 api요청 주소로 가공  
body에서 연관 이슈 추출(부분 문자열 찾기)  
추출한 데이터를 해당 노드 데이터에 추가  
마우스 이벤트 구현  
