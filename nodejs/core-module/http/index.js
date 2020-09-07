const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.setHeader('X-Foo', 'bar');
  res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
  res.end('你好世界\n')
})

console.log(process.argv)
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})