# EventLoop

## 任务类型
* 宏任务（macro task）：宿主发起的任务称为宏任务
  - script 
  - setTimeout、setInterval
  - setImmediate 
  - I/O 操作（如文件读取）
  - DOM 事件（点击、滚动等）
  - requestAnimationFrame
* 微任务（micro task）：js引擎发起的任务称为微任务
  - process.nextTick（Node 独有）
  - promise、async/await
  - MutationObserver （DOM 变动观察）

## 浏览器 EventLoop
* ![浏览器 EventLoop](./imgs/node_brower_eventLoop.png)
* 事件循环的核心组成
  - 调用栈（Call Stack）：按顺序执行同步代码（如函数调用）
  - 任务队列（Task Queue / Macro Task Queue）：存放 宏任务（Macro Task），当前调用栈清空后，按队列顺序执行
  - 微任务队列（Microtask Queue）：存放 微任务（Micro Task），每个宏任务执行完毕后，立即清空微任务队列

* 执行流程
  1. 按顺序执行调用栈中的同步代码，直到调用栈清空。
  2. 系统就会读取"微任务队列"，放执行栈，开始执行，直到微任务队列清空。
  3. 执行渲染更新（如需要）：
  4. 从任务队列中取出一个宏任务执行：重复步骤 1~4，形成循环。
  
## nodejs EventLoop
> Node.js 的事件循环基于 libuv 库实现
* 事件循环的六个阶段
  - Node.js 的事件循环分为六个阶段，每个阶段处理特定类型的任务，按顺序循环执行：
  1. Timers	执行 setTimeout 和 setInterval 的回调。
  2. Pending I/O	处理系统操作（如 TCP 错误）的回调。
  3. Idle/Prepare	内部使用的准备阶段（通常无需关注）。
  4. Pol 检索新的 I/O 事件，执行 I/O 回调（如文件读写、网络请求）。
  5. Check	执行 setImmediate 的回调。
  6. Close Callback 执行关闭事件的回调（如 socket.on('close', ...)）。
* 常见问题
  - 如何确保 setImmediate 先于 setTimeout 执行？
  ```js
    // 在 I/O 回调中调用 setImmediate，可确保其先执行：
    const fs = require('fs');
    fs.readFile(__filename, () => {
        setTimeout(() => console.log('setTimeout'), 0);
        setImmediate(() => console.log('setImmediate'));
    });
    // 输出顺序：setImmediate → setTimeout
  ```