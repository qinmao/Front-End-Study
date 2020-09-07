const url = require('url');

// URL 字符串是结构化的字符串, 解析字符串后返回的 URL 对象，每个属性对应字符串的各个组成部分。
// url 模块提供了两套 API 来处理 URL：一个是旧版本传统的 API，一个是实现了 WHATWG标准的新 API。

// 1. 使用 WHATWG 的 API 解析 URL 字符串：
const myURL1 = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myURL1)

// 2. 使用传统的 API 解析 URL 字符串：
const myURL2 =
    url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myURL2)
