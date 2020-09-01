const http = require("http");
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.method == "GET") {
    res.end("this is get");
  } else if (req.method == "POST") {
    res.end("this is POST");
  } else {
    res.end('Hello World');
  }
}).listen(8888);
