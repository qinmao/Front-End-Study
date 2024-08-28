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
  ```bash
    # 安装 nvm（Node 版本管理器）
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    # 下载并安装 Node.js（可能需要重新启动终端）
    # 设置代理
    # 打开nvm目录，找到setting.txt 文件夹打开没有创建
    # node_mirror: https://npmmirror.com/mirrors/node/
    # npm_mirror: https://npmmirror.com/mirrors/npm/

    nvm install 20

    # 验证环境中是否存在正确的 Node.js 版本
    node -v # 应打印 `v20.16.0`

    # 验证环境中是否存在正确的 npm 版本
    npm -v # 应打印 `10.8.1`

    #  nvm 提供 nvm reinstall-packages 命令
    # 如你新安装的是 14.17.3 老版本是 14.17.0
    # 执行 就可以把老版本上的全局包重新安装在新版本上了
    nvm reinstall-packages 14.17.0 
  ```
## 源码编译安装
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
    - exports、require、module、
    - __fileName：当前执行脚本的文件名的路径 如：/path/to/your/current/directory/your_script.js
    - __dirname：当前执行脚本所在的目录的路径 如：/path/to/your/current/directory
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
* 多线程
  - 多线程是指在同一进程内，多个线程并发执行。
  - 每个线程都拥有自己的执行栈和局部变量，但共享进程的全局变量、静态变量等资源。
  - 多线程适合用于I/O密集型任务，如网络请求、文件操作等，
* 多进程
  - 多进程是指在操作系统中同时运行多个进程，每个进程都有自己独立的内存空间，相互之间不受影响。
  - 多进程适合用于CPU密集型任务，如计算密集型算法、图像处理等，因为多进程可以利用多核CPU并行执行任务，提高整体运算速度。
* 线程池
  - 线程池是一种预先创建一定数量的线程并维护这些线程，以便在需要时重复使用它们的技术。
  - 线程池可以减少线程创建和销毁的开销，提高线程的重复利用率
* 进程池
  - 进程池类似于线程池，不同之处在于进程池预先创建一定数量的进程并维护这些进程，以便在需要时重复使用它们。
  - 进程池可以利用多核CPU并行执行任务，提高整体运算速度。
* 线程池的优势
  - 轻量级: 线程比进程更轻量级，创建和销毁线程的开销比创建和销毁进程要小。
  - 共享内存: 线程共享同一进程的内存空间，可以方便地共享数据。
  - 低开销: 在切换线程时，线程只需保存和恢复栈和寄存器的状态，开销较低。
* 进程池的优势
  - 真正的并行: 进程可以利用多核CPU真正并行执行任务，而线程受到GIL的限制，在多核CPU上无法真正并行执行。
  - 稳定性: 进程之间相互独立，一个进程崩溃不会影响其他进程，提高了程序的稳定性。
  - 资源隔离: 每个进程有自己独立的内存空间，可以避免多个线程之间的内存共享问题。

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
    ```bash
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
* [串口技术](./串口通信.md)

## 调测
* [Nodejs调试](./nodejs调试.md)

## Nodejs c++扩展
* [Nodejs-c++扩展](./nodejs-c++.md)

## 安全
* 限流 
  - 同一个ip在指定的时间内访问的次数
* Helmet
  - 设置与安全相关的 HTTP 标头