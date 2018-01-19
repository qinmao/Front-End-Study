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
