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
        var owner = github.split('/')[3];
        var repo = github.split('/')[4];
        
        var getRepoString = `https://api.github.com/repos/${owner}/${repo}`;
        var getIssueString = getRepoString + `/issues?state=all`;

        var getCreateTime = '';
        _req({
            uri:getRepoString,
            method: 'GET',
            json: true,
            headers: { 'user-agent': 'node.js',
                        "Content-Type": "Application/json; charset=utf-8" }
        }, function(error, res, body){
            getCreateTime = body['created_at'];
            console.log('hello', getCreateTime);
        });
        console.log('Create-at : ', getCreateTime);
        var result = _req({
            uri: getIssueString,
            method: 'GET',
            json: true,
            headers: { 'user-agent': 'node.js',
                        "Content-Type": "Application/json; charset=utf-8" }
        }, function (error, res, body) {
            response.writeHead(200, { "Content-Type": "Application/json; charset=utf-8" });
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