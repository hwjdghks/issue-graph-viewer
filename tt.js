const http = require('http');
const { options } = require('request');
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
            json: true,
            headers: { 'user-agent': 'node.js',
                        "Content-Type": "Application/json; charset=utf-8" }
        }, function (error, res, body) {
            response.writeHead(200, { "Content-Type": "Application/json; charset=utf-8" });
            console.error('err', error);
            console.log(typeof body);
            // var _body = JSON.parse(body);
            // console.log(Object.keys(_body).length);
            // console.log(_body.length);
            for (var x = 0; x < Object.keys(body).length; x++){
                console.log(body[x]['title']);
                // console.log(_body[x]['number'], _body[x]['title']);
            }
            // response.write(body);
            response.end();
        });
    }
});

server.listen(8080, function () {
    console.log("서버 실행됨");
});