// 截止2024-4-2日 目前没有浏览器支持http请求访问http2,所以要用https

import http2 from "node:http2";
import fs from "node:fs";

const server = http2.createSecureServer({
    key: fs.readFileSync("private-key.pem"),
    cert: fs.readFileSync("public-certificate.pem"),
});

server.on("stream", (stream, headers) => {
    stream.respond({
        "content-type": "text/html; charset=utf-8",
        ":status": 200,
    });
    stream.on("error", (err) => {
        console.log(err);
    });
    stream.end(`
      <h1>http2</h1>
    `);
});

server.listen(80, () => {
    console.log("server is running on port 80");
});
