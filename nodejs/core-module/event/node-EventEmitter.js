const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("开始");
});
eventEmitter.emit('start')

// once(): 添加单次监听器。
// removeListener() / off(): 从事件中移除事件监听器。
// removeAllListeners(): 移除事件的所有监听器。
// // 移除监绑定的 listener1 函数

