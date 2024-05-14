# 进程相关

## process
  - 是一个全局对象,代表当前的 nodejs 进程
  - 它提供了对进程的控制和管理的功能，可以访问进程的信息、事件和各种操作。通过 process 对象，我们可以获取命令行参数、环境变量，设置定时器、退出程序等。

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

  - process.nextTick() 将在下一轮事件循环中调用
  ```js
    process.nextTick(function () {
        console.log('nextTick callback!');
    });
  ```
* 常用事件
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

## Child process
+ Child process 模块提供了创建和管理子进程的功能。
  - 它允许你在 Node.js 程序中执行外部命令、脚本或其他可执行文件，并与其进行交互。
  - child_process 提供了多个函数来创建子进程，如 spawn()、exec() 和 fork() 等。

* child_process.spawn()
  - 最常用的方法之一，用于启动一个新的进程执行指定的命令。它返回一个 ChildProcess 对象，可以通过监听事件来处理子进程的标准输出、错误输出等。
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
* child_process.exec()
  - 执行一个 shell 命令，并缓冲产生的输出。它将整个子进程的输出缓冲到内存中，直到完成执行后一次性返回。
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

    // 1. 打开一个应用程序
    exec('open /Applications/DingTalk.app'); // 这里是Mac下的打开方式，Windows下需要修改命令
    // 2.1  在 Windows 上通过钉钉协议 打开应用程序
    exec('start dding://', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log('钉钉应用程序已成功启动');
    });
    // 2.2 钉钉可执行文件路径
    const dingPath = 'C:\\Program Files (x86)\\Dingtalk\\Dingtalk.exe';

    exec(`"${dingPath}"`)
  ```
* child_process.fork()
  - 类似于 spawn() 方法，但是专门用于衍生新的 Node.js 进程。它会使用新的 V8 实例，独立于父进程。
  ```js
    const { fork } = require('node:child_process');

    const child = fork('child.js');

    child.on('message', (message) => {
        console.log('Message from child:', message);
    });

    child.send({ hello: 'world' });

  ```

* spawn、exec、fork 区别
> 在 Node.js 中，`spawn`、`exec` 和 `fork` 是 `child_process` 模块提供的三种不同的方法，用于创建子进程执行外部命令。它们之间的主要区别在于以下几点：

1. **spawn**：
   - `spawn` 方法用于启动一个新的进程来执行指定的命令。
   - 它是最基本的子进程创建方法，可以灵活地控制输入输出流。
   - 适合执行耗时较长的命令或者需要处理大量数据的场景。

2. **exec**：
   - `exec` 方法是封装在 `spawn` 基础之上的更高级的接口。
   - 它允许你执行一个命令，并缓冲产生的输出。
   - 适合执行简单的命令，并且需要获取执行结果的场景。

3. **fork**：
   - `fork` 方法是 `spawn` 的特殊形式，专门用于衍生新的 Node.js 进程。
   - 它会使用 `child_process.fork()` 方法来创建一个新的 Node.js 进程，并在父子进程之间建立通信管道。
   - 适合用于多核 CPU 的并行计算、创建可靠的子进程服务等场景。

**总结**：
  - 如果你需要执行一个外部命令并与其交互，可以使用 `spawn`。
  - 如果你只需要执行外部命令并获取其输出，可以使用 `exec`。
  - 如果你需要衍生一个新的 Node.js 进程，并与其通信，可以使用 `fork`。
## process 上的事件触发器
* 经查阅源码发现，nodejs 已经把 events 事件触发器嫁接到 process 上,可以直接用