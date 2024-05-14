# node
## 总体上的感知
* Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
* Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
## 应用场景
> NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景
* RESTful API
* 统一Web应用的UI层
* 大量Ajax请求的应用
## 优缺点
* 优点:
  + 高并发,高性能
    - 构建在 Chrome V8 引擎上，动态语言运行时里最快的
    - 天生异步的
  + 适合I/O密集型应用
    - 网络应用的瓶颈在I/O的处理
  + 并发编程简单
    - 有了事件驱动和非阻塞的I/O机制，可以使用少量的资源处理非常多的连接和任务
* 缺点:
  - 不适合CPU 密集型应用，老版本由于JavaScript单线程的原因(新版本支持多线程)，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；
  + 解决：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起；
    - 开源组件库质量参差不齐，更新快，向下不兼容
    - 写法上恶心的回调，终极解决方案：Async/Await
## 安装
* node 安装完成后 npm 默认安装，
* Mac|Linux 推荐安装 nvm 来切换 node 版本
  - 注意: 从 v18 开始，由于 glibc 版本不兼容，Node.js 不再支持 centos 7和其他一些 Linux 发行版。
* windows 推荐使用[nvm-windows](https://github.com/coreybutler/nvm-windows)
* 使用 nvm 安装 nodejs 更换版本后，全局模块需要重新安装的问题?
  - nvm 提供 nvm reinstall-packages 命令
  - 例子：如你新安装的是 14.17.3 老版本是 14.17.0
  - 执行 nvm reinstall-packages 14.17.0 就可以把老版本上的全局包重新安装在新版本上了
## 源码编译
1. 安装依赖
  ```bash
   yum install g++ curl libssl-dev apache2-utils git-core build-essential
  ```
2. 下载源码编译
  ```bash
    git clone https://github.com/nodejs/node.git
    cd node
    
    # 指定安装目录
    ./configure --prefix=/usr/local/node  

    # 编译成二进制可执行程序
    make
    make install
  ```
## es支持检测
* npm install -g es-checker
* 运行：es-checker
## 软件管理包
* [npm](../包管理/npm.md)
## node架构
![node架构](./imgs/node结构.jpg)
## node事件驱动模型
* 主线程：
  1. 执行 node 的代码，把代码放入队列
  2. libuv 中的事件循环程序（主线程）把队列里面的同步代码都先执行了
  3. 同步代码执行完成，执行异步代码
  4. 异步代码分2种状况
    - 异步非io setTimeout setInterval 判断是否可执行，如果可以执行就执行，不可以跳过。
    - 异步 io 文件操作 libuv 会从线程池当中去取一条线程，帮助主线程去执行。
    - 而网络I/O是不通过线程池完成
  5. 主线程会一直轮训，队列中没有代码了，主线程就会退出。

* 子线程：被放在线程池里面的线程，用来执行异步io操作
  1. 在线程池里休息
  2. 异步io的操作来了，执行异步io操作。
  3. 子线程会把异步io操作的callback函数，扔回给队列
  4. 子线程会回到线程池了去休息,callback在异步io代码执行完成的时候被扔回主线程。

* 浏览器的事件循环和 nodejs 事件循环的区别？
  - 浏览器环境下，每个 macrotask 执行完之后执行 --> microtask 的任务队列
  - 在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执 microtask 队列的任务。

* process.nextTick 并不属于 Event loop 中的某一个阶段, 而是在 Event loop 的每一个阶段结束后, 直接执行 nextTickQueue 中插入的 "Tick"
## 模块
* 内置全局对象大致能够分为5大类（无需引入）：
  + ① 为模块包装而提供的全局对象： 
    - exports、require、module、__fileName、__dirname
  + ② 内置的 process 对象
  + ③ 控制台Console模块
    - console.table(非常有用)
    - console.time
      ```js
        console.time('100-elements'); // 打印：100-elements: 0.093ms 0
        for (let i = 0; i < 100; i++) {
          console.timeLog('100-elements',i) // 打印100次：100-elements: xxxms i
        }
        console.timeEnd('100-elements'); // 打印：100-elements: 34.542ms
      ```
  - ④ EventLoop 相关API:SetTimeout、SetInterval、SetImmediate
  - ⑤ Buffer数据类型和全局对象 global
* 如何引入外部模块
  - 引入外部模块有两种规范 Commonjs(早期es没有模块，nodejs 中的定义的模块规范) 和 ES的modules(es 标准)， 推荐使用 es 标准库模块。
  - nodejs 现在已经支持标准库模块
* 在 nodejs 中如何直接使用 es 标准库模块？
  > 从 Node.js 12 版本开始，Node.js 支持大部分 ECMAScript 标准库模块，无需额外安装或配置。
  + 几种方式
    - 方式一：脚本文件的扩展名为 .mjs
    - 方式二：package.json 文件中将 "type" 字段的值设置为 "module"
    - 方式三：命令行参数 --input-type=module 指定输入类型为模块
  - 推荐使用方式二 在 package.json 文件中可以使用 "type": "module" 表示整个项目使用 ES 模块，但仍然可以引入 CommonJS 模块。
  + 注意：
    - 在 ES 模块中，Node.js 不再提供 __dirname 和 __filename 这样的特殊变量。使用 import.meta.filename and 
    import.meta.dirname 来代替
    ```js
      console.log('import.meta.filename:', import.meta.url);
      console.log('import.meta.dirname:', new URL('.', import.meta.url).pathname);
    ```
    - Addons are not currently supported with ES module imports.They can instead be loaded with module.createRequire() or process.dlopen.
     ```js
        import { createRequire } from 'node:module';
        const require = createRequire(import.meta.url);

        // sibling-module.js is a CommonJS module.
        const siblingModule = require('./sibling-module');
     ```

## RPC（远程过程调用）
* 是什么东西
  - 一种用于实现分布式系统中进程间通信的技术。它允许一个进程（或程序）调用另一个进程（或程序）中的函数或方法，就像调用本地函数一样，而无需程序员显式地处理底层通信细节。

* 应用场景：

* 优缺点：
  - 优点：简化分布式系统开发、提高代码复用性、隐藏底层通信细节等。
  - 缺点： 如网络延迟、序列化和反序列化开销、服务发现和负载均衡等问题
* 常见的框架
  - gRPC：由 Google 开发的高性能、通用的远程过程调用框架，基于 HTTP/2 协议和 Protocol Buffers（protobuf）进行通信和数据序列化
  
## 进程与线程
> 利于多核cpu
* 熟悉与进程有关的基础命令, 如 top, ps, pstree 等命令.
* child_process
  - child.kill 与 child.send 的区别. 二者一个是基于信号系统, 一个是基于 IPC.
* Cluster 
  - 是常见的 Node.js 利用多核的办法. 它是基于 child_process.fork() 实现的
  - cluster 产生的进程之间是通过 IPC 来通信的, 并且它也没有拷贝父进程的空间, 而是通过加入 cluster.isMaster 这个标识, 来区分父进程以及子进程, 达到类似 POSIX 的 fork 的效果.
* 进程间通信
  - ipc
  - 消息队列
  - 信号量
* 守护进程
## web framework
* 通用型
  - [express](https://www.expressjs.com.cn/)
  - [koa](http://www.ruanyifeng.com/blog/2017/08/koa.html)
* 企业级：
    - [egg](https://eggjs.org/zh-cn/intro/index.html)
    - nest(基于typescript)
* koa-generator
  - 非官方，狼叔开发的
    ```
     npm install koa-generator -g
     koa2 projectName
    ```
## 数据库
* mysql
  - [typeorm](https://typeorm.io/)
* redis（ioredis）
   - ioredis 是一个强大的 nodejs 库用于和 redis 交互
   - 高性能：支持管道操作、支持连接池、支持断线重连
   - promise 和 async、await 支持
   - 支持集群
   - 支持 lua 脚本
   - 支持发布订阅
   - 流和管道
## 串口技术
* TODO
## 调试
* [Nodejs调试](./nodejs调试.md)
## Nodejs c++扩展
* [Nodejs-c++扩展](./nodejs-c++.md)
## 安全
* 限流 
  - 同一个ip在指定的时间内访问的次数
* Helmet
  - 设置与安全相关的 HTTP 标头
## 测试
* http 性能指标
  - qps（request per second） 每秒服务器能够承载的并发量
  - transfer rate(吞吐量) 每秒吞吐的数据量大小
* 性能测试工具
  - ab
  ```bash
    # 安装Apache会自动安装，如果要单独安装ab，可以使用yum安装：
    yum -y install httpd-tools

    #  基本的参数：-c 200 并发请求个数 -n 1600 执行的请求数量  -t20 测试20s 
    # -p 包含了需要POST的数据的文件 -T POST数据所使用的Content-type头信息
    ab -c200 -n1600 -t10 http://127.0.0.1:3000/app/hello

  ```
   > mac 系统下 请求本地 报 apr_socket_recv: Connection reset by peer (54) 原因是：mac自带的ab限制了并发数导致的。下载最新的 ab
    ```bash
      brew install httpd
      # 最后需要使用新安装的 httpd 下的 ab
    ```
  - autocannon 
  > Node.js 写的压测工具
  ```bash
    npm i -g autocannon
    autocannon -v

    -a, --amount: 总请求数量，默认值为 0（表示持续运行）
    -b, --body BODY 请求报文体  可以是 JSON 文件、URL 编码的字符串或二进制文件路径。
    -c, --connections NUM 并发连接的数量，默认100
    -d, --duration SEC 执行的时间，单位秒
    -p, --pipelining 管道请求数量，默认值为 1。
    -m, --method METHOD 请求类型 默认GET
    -t, --timeout: 单个请求最长超时时间，单位为秒，默认值为 10。
    -H, --header: 自定义请求头，例如 -H 'Authorization: Bearer xxxx'.

    # 使用示例
    autocannon -c 10 -d 5 -p 1 http://127.0.0.1:3000

  ```
* linux 的命令找性能瓶颈
  - top：cpu、内存
  - iostat：硬盘
  - profile 性能分析工具（nodejs自带的）
  - chrome devtool
## 分析性能瓶颈的步骤
1. 命令行运行 node --inspect-brk main.js 出现 Debugger listening on xxx 表示成功
2. chrome 浏览器 输入 chrome://inspect  找到 target 下的 inspect 点击， 工具栏有 Profile(cpu)、Memory(内存) 
3. 点击cpu 开始记录 使用 ab 压测cpu
 ```bash
   ab -c 100 -n 100 -t 10 http://127.0.0.1:3000/app/hello
 ```
4. 点击 chrome 停止记录按钮, 找到百分比高的函数具体分析:
