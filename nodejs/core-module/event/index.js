// 引入 events 模块
const events = require("events");
// 创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter();

// 绑定 connection 事件处理程序
eventEmitter.on("connection", () => {
    console.log("连接成功。");
    // 触发 data_received 事件
    eventEmitter.emit("data_received");
});

// 使用匿名函数绑定 data_received 事件
eventEmitter.on("data_received", function () {
    console.log("数据接收成功。");
});

// 触发 connection 事件
eventEmitter.emit("connection");

console.log("程序执行完毕。");

// once(): 添加单次监听器。
// removeListener() / off(): 从事件中移除事件监听器。
// removeAllListeners(): 移除事件的所有监听器。
// // 移除监绑定的 listener1 函数
