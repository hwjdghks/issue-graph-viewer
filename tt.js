const http = require('http');
const _req = require('request');

var github = 'https://github.com/sunghwan2789/Bible2PPT';
var server = http.createServer(function (requset, response) {
    if (requset.url == '/') {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write('<h1>hello world!</h1>');
        response.end();
    }
    else if (requset.url == '/test' && requset.method == 'GET') {
        var _url = 'https://api.github.com/repos/'
            + github.substr(19)
            + '/issues?state=all';
        var result = _req({
            uri: _url,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }, function (error, res, body) {
            response.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
            response.write(body);
            response.end();
        });
    }
});

server.listen(8080, function () {
    console.log("서버 실행됨");
});