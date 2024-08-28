# curl

## curl 是什么？
  - curl是一个命令行访问URL的工具，作用是发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上面
  - 额外还支持cookie特性，可以用curl完成web浏览器的基本功能，curl 还支持 HTTPS/FTP/FTPS/TELNET/LDAP等协议。

## 常用指令
```bash
  # 查看当前版本
  curl -V

  # 查看帮助
  curl --help

  -v 详细输出，包含请求和响应的首部
  
  -o test 将指定curl返回保存为test文件，内容从html/jpg到各种MIME类型文件
  
  -O  把输出写到该文件中，保留远程文件的文件名
  
  -C 在保存文件时进行续传
  
  -X  是指定什么类型请求(POST/GET/HEAD/DELETE/PUT/PATCH)
  
  -x  ip:port 指定使用的http代理
  
  -c <file> 保存服务器的cookie文件
  
  -H <header:value>  为HTTP请求设置任意header及值
  
  -L 跟随重定向
  
  -S 显示错误信息
    
  -f  连接失败是不显示http错误
  
  -d 以post方式传送数据
```
## 示例
```bash
  # 查询当前网络ip
  curl ipinfo.io
  curl cip.cc

  # 不带参数的请求
  curl GET 'https://xxx.com/xxx'
  curl POST 'https://xxx.com/xxx'

  # 发送 post 请求
  curl -X POST -d 'a=1&b=nihao' URL

  # 发送json格式请求
  curl -H "Content-Type: application/json" -X POST -d '{"abc":123,"bcd":"nihao"}' URL
  curl -H "Content-Type: application/json" -X POST -d @test.json URL

```