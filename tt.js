const http = require('http');
const _req = require('request');

var github = 'https://github.com/sunghwan2789/Bible2PPT';
var server = http.createServer(function (requset, response) {
    if (requset.url == '/') {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write('<h1>hello world!</h1>');
        response.end();
    }

    // github data get
    else if (requset.url == '/test' && requset.method == 'GET') {
        var owner = github.split('/')[3];
        var repo = github.split('/')[4];

        // basic GET qs
        var getRepoString = `https://api.github.com/repos/${owner}/${repo}`;
        var currentPage = 1;
        var perPage = 40;
        var direction = 'asc'

        // finished version GET qs
        var getIssueString = getRepoString
            + `/issues?state=all`
            + `&per_page=${perPage}`
            + `&page=${currentPage}`
            + `&direction=${direction}`;

        _req({
            uri: getIssueString,
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
            // 전체 페이지수 method:HEAD로 가져와서 가공할 것
            console.log(res.headers.link);
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