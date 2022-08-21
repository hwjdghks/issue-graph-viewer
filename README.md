github issue api 찾아보기  
https://docs.github.com/en/rest/reference/issues  
https://docs.github.com/en/rest/reference/repos#get-a-repository  

postman으로 api 작동확인 가능  
생활코딩 로드맵 지도 기술 찾아보기  
https://github.com/markitx/issue-graph  
https://seomal.org/  
https://observablehq.com/@d3/disjoint-force-directed-graph  
https://cyberx.tistory.com/211  



node js  
url parse시 주의 사항. 생코 동영상은 구버전으로 더이상 추천하지 않음  
https://velog.io/@satoshi25/url.parse-deprecated  

request module 만료됨 promis 공부를 위해 사용중  
> github API에 대해 octokit으로 대체 가능
<br>

api  
get요청시 `Request forbidden by administrative rules. Please make sure your request has a User-Agent header (http://developer.github.com/v3/#user-agent-required). Check https://developer.github.com for other possible causes.` 에러 해결하기  
https://stackoverflow.com/questions/21383937/request-forbidden-while-accessing-github-api-on-node-js-program  
<br>

token  
Postman 사용중 이상한 현상  
<br>
Postman에서 Authorization부분에 토큰값을 넣고 (Type : Bearer Token)  
API 요청시 Header에 `"Authorization": "token USER_TOKEN"`을 입력하면 Postman에서 API사용 횟수가 정상적으로 증가함  
Localhost 새로고침 한번 + Postmman 요청 한번 총 2번씩 증가  
<br>
하지만 `token`을 지워 `"Authorization": "USER_TOKEN"`을 입력시 Postman에서 한번만 증가되는 현상이 있다  
> 의문점: 후자의 경우 api 요청이 정상적으로 이루어져야 반영이 되는 데이터가 제대로 반영됨  
> 하지만 Postman에서는 api 사용횟수가 올라가지 않음
