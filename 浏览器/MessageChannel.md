# MessageChannel

## 概念
* 是 HTML5 引入的一种用于在不同的浏览上下文（如不同的窗口、iframe 或 Web Worker）之间进行双向通信的 API。
* 它提供了两个端口（port1 和 port2），通过这些端口，消息可以在两个独立的线程之间双向传递。

## 核心特性
* 双向通信：两个端口（port1 和 port2）可互相发送消息。
* 独立通道：消息仅在通道内传递，避免全局消息干扰。
* 低耦合：适合需要解耦的组件间通信。
* 轻量级：比全局 postMessage 更高效可控。

## 示例
  ```js
    // 创建通道
    const channel = new MessageChannel();

    // 获取两个端口
    const port1 = channel.port1;
    const port2 = channel.port2;

    // 发送端 (port1)
    port1.postMessage({ type: "greeting", data: "Hello from port1!" });

    // 接收端 (port2)
    port2.onmessage = (event) => {
        console.log("port2 收到消息:", event.data);
        // 可回复消息
        port2.postMessage({ type: "reply", data: "Hi, port1!" });
    };
    // 必须调用 port.start() 才能接收消息（隐式调用 addEventListener("message") 时会自动触发）。
    port2.start();

    // 使用后需手动关闭端口：
    // port2.close()

    // 使用 postMessage 传递端口时，需通过 Transferable 对象 明确转移所有权：
    target.postMessage({ port }, [port]); // 第二个参数声明转移对象
  ```

## 常见应用场景
* 主线程与 Web Worker 间私有通信
  ```js
  // 主线程
    const worker = new Worker("worker.js");
    const channel = new MessageChannel();

    // 将一个端口传递给 Worker
    worker.postMessage({ port: channel.port2 }, [channel.port2]);

    // 主线程使用 port1 通信
    channel.port1.onmessage = (e) => {
        console.log("主线程收到:", e.data);
    };
    channel.port1.postMessage("主线程消息");
    channel.port1.start();

    // worker.js
    self.onmessage = (e) => {
        const port = e.data.port;
        port.onmessage = (event) => {
            console.log("Worker 收到:", event.data);
            port.postMessage("Worker 回复");
        };
        port.start();
    };
  ```
* 多窗口/iframe 间定向通信
  ```js
    // 父页面
    const iframe = document.querySelector("iframe");
    const channel = new MessageChannel();
    // 将 port2 传递给 iframe
    iframe.contentWindow.postMessage({ port: channel.port2 }, "*", [channel.port2]);
    // 父页面通过 port1 通信
    channel.port1.postMessage("来自父页面");
    channel.port1.start();


    // iframe 内
    window.onmessage = (e) => {
        const port = e.data.port;
        port.onmessage = (event) => {
            console.log("iframe 收到:", event.data);
        };
        port.start();
    };
  ```
* Service Worker 与页面通信
  ```js
   // 页面脚本
    navigator.serviceWorker.controller.postMessage(
    { type: "SYNC_REQUEST" },
    [channel.port2]
    );
    channel.port1.onmessage = (e) => {
        console.log("收到 Service Worker 回复:", e.data);
    };

    // Service Worker
    self.onmessage = (e) => {
        const port = e.ports[0];
        port.postMessage("Service Worker 已处理");
    };
  ```