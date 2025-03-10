# nodejs 中的进程线程

## 进程线程
* 参见操作系统进程与线程

## process 对象
* 是一个全局对象,代表当前的 nodejs 进程,它提供了对进程的控制和管理的功能，可以访问进程的信息、事件和各种操作。可以获取命令行参数、环境变量，设置定时器、退出程序等。

* 常用属性
  - process.arch   cpu 架构
  - process.platform
  - process.argv          获取命令行参数

  - process.env  读取操作系统所有环境变量，
  - process.env.xxx='xxx' 可以修改但只在当前进程生效不会影响系统
  > 通过这个跨平台工具修改 cross-env

* 常用方法
  + process.memoryUsage()
    - rss           常驻集大小，物理内存的存量
    - heapTotal     v8 给分配的内存总大小包括未使用的内存
    - headUsed      已使用的内存
    - external      外部的内存c、c++使用的
    - arrayBuffers  二进制的总量

  - process.cwd()     获取当前工作目录
  - process.exit(1)   退出node进程并返回退出码
  - process.kill(pid) 杀死进程，需要进程id作为参数 process.pid 
  - child.kill 与 child.send 的区别. 一个是基于信号系统, 一个是基于 IPC.
  
  + process.nextTick:将在下一轮事件循环中调用
    - 并不属于 Event loop 中的某一个阶段, 而是在 Event loop 的每一个阶段结束后, 直接执行 nextTickQueue 中插入的 "Tick", 并且直到整个 Queue 处理完. 
    ```js
        // 递归调用 process.nextTick 会怎么样? 
        // 会导致 Node.js 事件循环中的微任务队列不断增长，从而占用大量的内存，并最终导致堆栈溢出错误。
        function test() { 
            process.nextTick(() => test());
        }
        function test() { 
            setTimeout(() => test(), 0);
        }
    ```

* 常用事件
  - 经查阅源码发现，nodejs 已经把 events 事件触发器嫁接到 process 上,可以直接用
  ```js
    // 程序即将退出时的回调函数:
    process.on('exit', function (code) {
        console.log('about to exit with code: ' + code);
    });

    process.on('beforeExit', () => {
        app.close().then(() => {
            console.log('Server closed');
            process.exit(0);
        });
    });
  ```

* process.stderr, process.stdout 以及 process.stdin 三个标准流

## child_process
> 创建子进程执行外部命令或脚本
* spawn 流式执行命令（适合持续输出，如日志）
  ```js
    const { spawn } = require('node:child_process');

    // 使用 spawn 创建子进程并执行命令
    const ls = spawn('ls', ['-l']);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.stdout.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

  ```

* exec 执行命令并缓冲输出（适合短命令）。
  ```js
    const { exec } = require('node:child_process');
    exec('ls -l', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
  ```

* fork 创建 Node.js子进程，建立IPC通信（适合拆分计算任务）
  - 适用场景：调用系统工具、运行独立脚本、拆分CPU密集型任务。
  ```js
    const { fork } = require('node:child_process');

    const child = fork('child.js');
    child.on('message', (message) => {
        console.log('Message from child:', message);
    });
    child.send({ x: '4' });

    // 子进程 child.js
    process.on('message', ({ x }) => {
        const result = x * 2;
        process.send(result);
    });
    // 错误处理
    child.on('error', (err) => console.error('子进程错误：', err));
    child.on('exit', (code) => console.log('子进程退出码：', code));

    // 资源回收:父进程退出时清理子进程
    process.on('exit', () => child.kill());
  ```

## Cluster 
* 创建共享端口的子进程集群，充分利用多核CPU。
  - 基于 child_process.fork() 实现的, 所以 cluster 产生的进程之间是通过 IPC 来通信的, 
  - 没有拷贝父进程的空间, 而是通过加入 cluster.isMaster 这个标识, 来区分父进程以及子进程
* 工作原理：
  - 主进程：管理子进程，监听端口并分发请求。
  - 子进程：运行应用实例，处理具体请求。
* 适用场景：HTTP服务器横向扩展、高并发请求处理。

* 示例
  ```js
    const cluster = require('cluster');
    const http = require('http');

    const numCPUs = require('os').cpus().length;

    if (cluster.isMaster) {
        // 主进程：创建工作进程
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker) => {
            console.log(`Worker ${worker.process.pid} 退出`);
        });
    } else {
        // 子进程：启动HTTP服务
        http.createServer((req, res) => {
            res.end('Hello from Worker ' + process.pid);
        }).listen(3000);
    }
  ```

## worker_threads
在同一进程中创建轻量级线程（共享内存）。
* 与进程的区别：
  - 资源开销小：线程共享进程内存。
  - 通信高效：通过 SharedArrayBuffer 或 MessageChannel 传递数据。
* 示例
  ```js
    const { Worker, isMainThread } = require('worker_threads');

    if (isMainThread) {
        // 主线程
        const worker = new Worker(__filename);
        worker.on('message', (msg) => console.log('主线程收到：', msg));
        worker.postMessage('Hello Worker!');
    } else {
        // 工作线程
        parentPort.on('message', (msg) => {
            console.log('工作线程收到：', msg);
            parentPort.postMessage('Hello Main!');
        });
    }
  ```
  
## 进程间通信
* child_process ipc:通过 send() 和 message 事件传递JSON消息。
* worker_threads通信：使用 postMessage 或共享内存。
* 跨机器通信：结合消息队列（如RabbitMQ、Kafka）。

## 守护进程
* 守护进程是不依赖终端（tty）的进程, 不会因为用户退出终端而停止运行的进程
* Node 如何实现守护进程？
  - PM2：生产级进程管理工具，支持集群模式、日志管理、监控

