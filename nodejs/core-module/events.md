# events 事件触发器
> 用法和vue2的 event bus 三方库 mitt 采用发布订阅模式

## 发布订阅模式
* off on emit once

## 用法
  - 事件默认是监听10个
  ```js
    // 引入 events 模块
    // import { EventEmitter } from 'node:events';
    const { EventEmitter } = require("node:events");
    const bus = new EventEmitter();

    bus.on("connection", () => {
        console.log("连接成功。");
        bus.emit("data_received");
    });

    bus.on("data_received", function () {
        console.log("数据接收成功。");
    });

    // myEmitter.emit('event', 1, 2, 3, 4, 5);
    bus.emit("connection");

    console.log("程序执行完毕。");

    // once(): 添加单次监听器。
    // off(): 从事件中移除事件监听器。
    // removeListener() 
    // removeAllListeners(): 移除事件的所有监听器。
  ```
## process 上的事件触发器
* 经查阅源码发现，nodejs 已经把 events 事件触发器嫁接到 process 上