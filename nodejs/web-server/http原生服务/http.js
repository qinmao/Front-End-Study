//1,引入 http 模块
var http = require("http");
//2,创建服务器
http.createServer(function (req, res) {

  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.method == "GET") {
    res.end("this is get");
  } else if (req.method == "POST") {
    res.end("this is POST");
  } else {
    // 发送响应数据 "Hello World"
    res.end('Hello World');
  }

}).listen(8888);

// 3. 文件服务器
// 解析URL需要用到Node.js提供的url模块 
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
// 结果
// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: 'user:pass',
//   host: 'host.com:8080',
//   port: '8080',
//   hostname: 'host.com',
//   hash: '#hash',
//   search: '?query=string',
//   query: 'query=string',
//   pathname: '/path/to/file',
//   path: '/path/to/file?query=string',
//   href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash'
// }

// 处理本地文件目录需要使用Node.js提供的path模块
var path = require('path');

// 解析当前目录:
var workDir = path.resolve('.'); // '/Users/michael'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'

// 简单文件服务器
'use strict';

var
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
  // 获得URL的path，类似 '/css/bootstrap.css':
  var pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  var filepath = path.join(root, pathname);
  // 获取文件状态:
  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
