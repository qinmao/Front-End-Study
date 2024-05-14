# http
## 创建http服务
  ```js
    // import { createServer } from "node:http";
    const { createServer } = require("node:http");

    const server = createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        //   res.statusCode = 200;
        //   res.setHeader("Content-Type", "text/plain;charset=utf-8");
        //   res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
        res.end("Hello World!\n");
    });

    // starts a simple http server locally on port 3000
    server.listen(3000, "127.0.0.1", () => {
        console.log("Listening on 127.0.0.1:3000");
    });
  ```
