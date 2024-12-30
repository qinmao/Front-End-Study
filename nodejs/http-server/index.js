// const http = require("http");
import http from "node:http";

// 创建服务器:
const server = http.createServer((req, res) => {
    // 获取文件状态:
    res.writeHead(200);
    res.end("hello world\n");
});

server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");
