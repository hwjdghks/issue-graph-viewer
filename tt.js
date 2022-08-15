const http = require('http');
const _req = require('request');
const makeLink = require('./makeLink.js');

var github = 'https://github.com/sunghwan2789/Bible2PPT';
var server = http.createServer(function (requset, response) {
    if (requset.url == '/') {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write('<h1>hello world!</h1>');
        response.end();
    }

    // github data get
    else if (requset.url == '/test' && requset.method == 'GET') {
        let Link = new makeLink(github);
        _req({
            uri: Link.getQueryString(),
            method: 'HEAD',
            headers: {
                'user-agent': 'node.js',
                'Content-Type': 'Application/json; charset=utf-8'
            }
        }, function (err, res, body) {
            // 페이지 수가 1개뿐이면 헤더에 링크가 나타나지 않는다.
            if (res.headers.link === undefined) {
                Link.setMaxPage(1);
            } else {
                let headerLink = res.headers.link;
                console.log(headerLink.lastIndexOf('page='));
                // 전체 페이지 수 잘라내는 명령어.
                // api 요청 파라미터 순서가 바뀔 경우 수정 필요
                let maxPage = headerLink.slice(headerLink.lastIndexOf('page=') + 5,
                    headerLink.lastIndexOf('&'));
                console.log('Total Pages : ' + maxPage);
                Link.setMaxPage(maxPage);
            }
        });
        _req({
            uri: Link.getQueryString(),
            method: 'GET',
            json: true,
            headers: {
                'user-agent': 'node.js',
                'Content-Type': 'Application/json; charset=utf-8'
            }
        }, function (error, res, body) {
            response.writeHead(200, {
                'Content-Type': 'Application/json; charset=utf-8'
            });
            // 타이틀 순서대로 출력 method:GET
            for (var x = 0; x < Object.keys(body).length; x++) {
                response.write(String(body[x]['number']).padStart(3, ' ')
                    + ' : '
                    + body[x]['title']
                    + '\n'
                );
            }
            response.end();
        });
    }

    // Server error 
    requset.on('error', function (error) {
        response.writeHead(404);
        response.write('※ 에러발생 : ', error);
        response.end();
    });
});

server.listen(8080, function () {
    console.log("서버 실행됨");
});