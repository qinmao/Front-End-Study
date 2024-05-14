# nodejs 
> 内容来自饿了么
## 模块
### 模块机制
* 如果 a.js require 了 b.js, 那么在 b 中定义全局变量 t = 111 能否在 a 中直接打印出来?
* a.js 和 b.js 两个文件互相 require 是否会死循环? 双方是否能导出变量? 如何从设计上避免这种问题?

### 热更新
### 上下文
### 包管理
* npm 的执行过程

## 事件/异步
### Promise
[promise](./promise.md)

### Events 
* Eventemitter 的 emit 是同步还是异步? 
  - 是同步的
```js
   // 题目1，如下的执行结果是输出 hi 1 还是 hi 2?
   // 先输出 hi 1，再输出 hi 2。
    const EventEmitter = require('events');

    let emitter = new EventEmitter();

    emitter.on('myEvent', () => {
        console.log('hi 1');
    });

    emitter.on('myEvent', () => {
        console.log('hi 2');
    });

    emitter.emit('myEvent');

    // 题目2 如下情况是否会死循环? 
    const EventEmitter = require('events');
    let emitter = new EventEmitter();
    emitter.on('myEvent', () => {
        console.log('hi');
        emitter.emit('myEvent');
    });
    emitter.emit('myEvent');

    const EventEmitter = require('events');

    // 题目3 会不会死循环?
    let emitter = new EventEmitter();
    emitter.on('myEvent', function sth () {
        emitter.on('myEvent', sth);
        console.log('hi');
    });

    emitter.emit('myEvent');
```
### timers

### 阻塞/异步
* 如何判断接口是否异步? 是否只要有回调函数就是异步
  - 单纯使用回调函数并不会异步, IO 操作才可能会异步, 除此之外还有使用 setTimeout 等方式实现异步.
* 如何实现一个 sleep 函数? 
  ```js
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // 使用示例
    console.log('开始等待...');
    sleep(2000).then(() => {
        console.log('2秒已过，继续执行后续操作...');
    });

  ```
### 并行并发
* 并发 (Concurrent) = 2 队列对应 1 咖啡机, 并行 (Parallel) = 2 队列对应 2 咖啡机.
* Node.js 通过事件循环来挨个抽取事件队列中的一个个 Task 执行, 从而避免了传统的多线程情况下 2个队列对应 1个咖啡机 的时候上下文切换以及资源争抢/同步的问题, 所以获得了高并发的成就.

## 进程
### Process (进程)
* 关于 Process, 我们需要讨论的是两个概念,
  - ①操作系统的进程
  - ② Node.js 中的 Process 对象.  在 Linux/Unix/Mac 系统中运行 ps -ef 命令可以看到当前系统中运行的进程.
*  列名称	意义
  - UID	执行该进程的用户ID
  - PID	进程编号
  - PPID	该进程的父进程编号
  - C	该进程所在的CPU利用率
  - STIME	进程执行时间
  - TTY	进程相关的终端类型
  - TIME	进程所占用的CPU时间
  - CMD	创建该进程的指令
* process.nextTick:
  - 并不属于 Event loop 中的某一个阶段, 而是在 Event loop 的每一个阶段结束后, 直接执行 nextTickQueue 中插入的 "Tick", 并且直到整个 Queue 处理完. 所以面试时又有可以问的问题了, 
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
* 进程的当前工作目录是什么? 有什么作用?
  - 当前进程启动的目录, 通过 process.cwd() 获取当前工作目录 (current working directory), 通常是命令行启动的时候所在的目录 (也可以在启动时指定), 文件操作等使用相对路径的时候会相对当前工作目录来获取文件.

* process 对象上还暴露了 process.stderr, process.stdout 以及 process.stdin 三个标准流,
* console.log 是同步还是异步? 
  - console.log 本身而言，它是同步执行的。
  
### Child Processes (子进程)
* 子进程 (Child Process) 
  - 是进程中一个重要的概念. 你可以通过 Node.js 的 child_process 模块来执行可执行文件, 调用命令行命令, 比如其他语言的程序等
  - 也可通过该模块来将 .js 代码以子进程的方式启动. 比较有名的网易的分布式架构 pomelo 就是基于该模块 (而不是 cluster) 来实现多进程分布式架构的.

### Cluster (集群)
* Cluster 是常见的 Node.js 利用多核的办法. 它是基于 child_process.fork() 实现的, 所以 cluster 产生的进程之间是通过 IPC 来通信的, 并且它也没有拷贝父进程的空间, 而是通过加入 cluster.isMaster 这个标识, 来区分父进程以及子进程, 达到类似 POSIX 的 fork 的效果

### 进程间通信

### 守护进程
* 守护进程是不依赖终端（tty）的进程, 不会因为用户退出终端而停止运行的进程

## io
### Buffer
### String Decoder (字符串解码)
### Stream (流)
### Console (控制台)
### File System (文件系统)
### Readline
### REPL

## Network
### Net (网络)
### UDP/Datagram
### HTTP
### DNS (域名服务器)
### ZLIB (压缩)
### RPC

## OS
### TTY
### OS (操作系统)
### Path
### 命令行参数
### 负载
### CheckList

## 错误处理/调试
### Errors (异常)
### Domain (域)
### Debugger (调试器)
### C/C++ 插件
### V8
### 内存快照
### CPU profiling

## util
### URL
### Query Strings (查询字符串)
### Utilities (实用函数)
### 正则表达式

## 存储
### Mysql
### Mongodb
### Replication
### 数据一致性
### 缓存

## 安全
### Crypto (加密)
### TLS/SSL
### HTTPS
### XSS
### CSRF
### 中间人攻击
### Sql/Nosql 注入

## 测试
### 测试方法
### 单元测试
### 集成测试
### 基准测试
### 压力测试
### Assert (断言)

