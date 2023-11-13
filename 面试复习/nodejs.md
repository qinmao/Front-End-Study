# nodejs 问题

## 事件循环
* nodejs 中的事件循环
  > Node.js启动的时候会初始化由libuv提供的事件循环，每次的事件循环都包含6个阶段，这6个阶段会在每一次的事件循环当中按照顺序反复执行
  - timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
  - I/O callbacks 阶段 ：处理一些上一轮循环中的少数未执行的 I/O 回调
  - idle, prepare 阶段 ：仅node内部使用

  - poll 阶段 ：获取新的I/O事件, 适当的条件下node将阻塞在这里
  - check 阶段 ：执行 setImmediate 的回调
  - close callbacks 阶段：执行 socket 的 close 事件回调

* 浏览器的事件循环和 nodejs 事件循环的区别？
  - 浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。
  - 在Node.js中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执microtask队列的任务。
## nodejs 怎么开启子进程(有哪些方法，他们的区别)？
* spawn：启动一个子进程来执行命令
* exec: 启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况
* execFlie: 启动一个子进程来执行可执行文件
* fork: 与spawn类似，不同电在于它创建 Node 子进程需要执行js文件
* spawn与exec、execFile不同的是，后两者创建时可以指定 timeout 属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死
* exec 与execFile不同的是，exec适合执行已有命令，execFile适合执行文件。

```js
const cluster = require("cluster");
if (cluster.isMaster) {
   const worker = cluster.fork();
}else{
    require("./app");
}
```
## nodejs 的 eventEmitter 的实现？