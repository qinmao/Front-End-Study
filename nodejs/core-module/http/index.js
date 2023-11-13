const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
  res.end("Hello World\n");
});

console.log(process.argv);
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});

//  Node.js 的标准模块来发送 http 请求

// get
// const options = {
//   hostname: "nodejs.cn",
//   port: 443,
//   path: "/todos",
//   method: "GET",
// };

// post
const data = JSON.stringify({
  todo: "做点事情",
});

const options = {
  hostname: "nodejs.cn",
  port: 443,
  path: "/todos",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

// post
req.write(data);

req.end();

// 使用axios 三方库发送http请求
const axios = require("axios");

axios
  .post("http://nodejs.cn/todos", {
    todo: "做点事情",
  })
  .then((res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
