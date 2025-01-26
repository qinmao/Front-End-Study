# 浏览器中的API

## DOM 操作API
[DOM 操作 API](./dom.md)

## Bom 操作API
[Bom操作 API](./bom.md)

## 存储 API
[存储 API](./本地存储.md)

## 网络API
* XMLHttpRequest
  ```js
   const $ = {
    // 处理对象的方法
    param: function (obj) {
        const httpStr = "";
        for (const k in obj) {
            httpStr += k + "=" + obj[k] + "&";
        }
        httpStr = httpStr.slice(0, -1);
        return httpStr;
    },
    ajax: function (options) {
        // 1.请求方式
        const type = options.type || "get";
        // 2.请求地址
        const url = options.url || "";
        // 3.请求正文
        let data = this.param(options.data || {});
        // 4.成功时的回调函数
        const successCallback = options.successCallback;

        // 1.实例化对象
        const xhr = new XMLHttpRequest();
        // 2.设置请求行
        if (type == "get") {
            url = url + "?" + data;
            data = null;
        }
        xhr.open(type, url);
        // 3.设置请求头
        if (type == "post") {
            xhr.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
        }
        // 5.监听并处理相应
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 6.成功时的回调
                successCallback(xhr.responseText);
            }
        };
        // 4.设置请求正文
        xhr.send(data);
        },
    };

  ```

* Fetch 用于发送 HTTP 请求的现代替代方案
  + 与 xhr 的区别?
    - Fetch 默认情况下不会发送同源的 Cookie，需要设置 fetch(url, {credentials: 'include'})
    - 服务器返回 400，500 等错误码时并不会 reject，只有网络错误导致请求不能完成时，fetch 才会被 reject。
    - IE 均不支持原生 Fetch
  - 请求图片
   ```js
    // 检测请求是否成功
    fetch('flowers.jpg')
    .then(response => response.blob())
    .then(blob => {
        // URL.createObjectURL(blob) 可以获取当前文件的一个内存URL
        myImage.src = URL.createObjectURL(blob);

        // FileReader.readAsDataURL(file)可以获取一段data:base64的字符串
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result)
        };
        reader.readAsDataURL(blob);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
    ```
  - 上传文件
    ```js
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('username', 'abc123');
        formData.append('avatar', fileField.files[0]);

        fetch('https://example.com/profile/avatar', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    ```
  - json 请求
    ```js
        fetch("http://localhost:3000/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached   
            credentials: 'same-origin', // include, *same-origin, omit     
            headers: {
                'Content-Type': 'application/json' // 'application/x-www-form-urlencoded'、text/plain、multipart/form-data
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            });
     ```
  - text 文本请求
    ```js
      fetch("http://localhost:3000/", {
            credentials: "include",
            method: "get",
            mode: "cors",
       })
        .then((response) => response.text())
        .then((text) => {
            console.log(text);
        });
    ```
    - gbk 乱码问题
    ```js
    // blob 解决返回的 html gbk 乱码问题
    fetch("http://localhost:3000/", {
        credentials: "include",
        method: "get",
        mode: "cors",
    })
        .then((response) => response.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                var htmlData = reader.result;
                console.log(htmlData);
            };
            reader.readAsText(blob, "GBK");
        });
    ```
    - 返回 arrayBuffer
    ```js
    // arrayBuffer
    fetch("http://localhost:3000/", {
        credentials: "include",
        method: "get",
        mode: "cors",
    })
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
           
        });
    ```

* 数据流式读取
  ```js
    async function sendPost(){
        // 第一个 awiat 等待的是请求头
       const response = await fetch("https://api.binjie.fun/api/generateStream?refer__1360=n4AxuDBDyDg0G%3DG8DlxGO4%2BrOb8p4iK03mQx", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrer": "https://chat18.aichatos58.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"prompt\":\"取对象数组最后三条记录\",\"userId\":\"#/chat/1733396635331\",\"network\":true,\"system\":\"\",\"withoutContext\":false,\"stream\":false}",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        });
        // 第二个事请求体
        // const resJson= await response.json()
         const reader=response.body.getReader()
         // 解码器
         const textDecoder= new TextDecoder()
         let contetent=''
         while(true){
            const {done,value}= await reader.read()
            if(done){
                break
            }
            const txt=textDecoder.decode(value)
            contetent+=txt
         }
        console.log(contetent)

         
    }
    sendPost()
  ```
  

## 地理位置API
* navigator.geolocation：用于获取用户的地理位置
  ```js
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
            },
            function (error) {
                console.log(error);
            }
        );
    }
    // 	当成功获取地理信息后，会调用succssCallback，并返回一个包含位置信息的对象position.Coord(坐标)
    //     1. coords.latitude：估计纬度
    // 　　2. coords.longitude：估计经度
    // 　　3. coords.altitude：估计高度
    // 　　4. coords.accuracy：所提供的以米为单位的经度和纬度估计的精确度
    // 　　5. coords.altitudeAccuracy：所提供的以米为单位的高度估计的精确度
    // 　　6. coords.heading： 宿主设备当前移动的角度方向，相对于正北方向顺时针计算
    // 　　7. coords.speed：以米每秒为单位的设备的当前对地速度
    //     当获取地理信息失败后，会调用errorCallback，并返回错误信息error
    //     可选参数 options 对象可以调整位置信息数据收集方式
    navigator.geolocation.watchPosition(success, error)
  ```

## 多媒体API
* MediaDevices：用于访问用户的摄像头和麦克风
  - navigator.mediaDevices.getUserMedia(constraints)
* HTMLMediaElement：用于控制音频和视频播放

## Web Workers API

## MessageChannel
* 概念
  - 是 HTML5 引入的一种用于在不同的浏览上下文（如不同的窗口、iframe 或 Web Worker）之间进行双向通信的 API。
  - 它提供了两个端口（port1 和 port2），通过这些端口，消息可以在两个独立的线程之间双向传递。

* 示例
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MessageChannel 示例</title>
    </head>
    <body>
        <h1>MessageChannel 示例</h1>
        <button onclick="startCommunication()">开始通信</button>
        <script>
            function startCommunication() {
                // 1. 创建 MessageChannel 实例
                const channel = new MessageChannel();

                // 2. 获取两个通信端口
                const port1 = channel.port1;
                const port2 = channel.port2;

                // 3. 设置消息处理程序
                port1.onmessage = (event) => {
                    console.log('Port1 received message:', event.data);
                };

                port2.onmessage = (event) => {
                    console.log('Port2 received message:', event.data);
                };

                // 4. 发送消息
                port1.postMessage('Hello from port1');
                port2.postMessage('Hello from port2');
            }
        </script>
    </body>
    </html>
  ```

* 使用场景
  - Web Worker 通信：在主线程和 Web Worker 之间进行双向通信。
  - 跨窗口通信：在不同的浏览器窗口或 iframe 之间进行通信。
  - 性能优化：使用 MessageChannel 可以实现更高效的消息传递，因为它是一个宏任务，执行速度比 setTimeout 更快。

* 案例：主线程与 Web Worker 之间的通信
  - 主线程代码
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MessageChannel 与 Web Worker 示例</title>
    </head>
    <body>
        <h1>MessageChannel 与 Web Worker 示例</h1>
        <button onclick="startWorker()">启动 Worker</button>
        <button onclick="sendMessage()">发送消息到 Worker</button>
        <script>
            let worker;
            let port1;

            function startWorker() {
                // 创建 Web Worker
                worker = new Worker('worker.js');

                // 创建 MessageChannel 实例
                const channel = new MessageChannel();

                // 获取两个通信端口
                port1 = channel.port1;
                const port2 = channel.port2;

                // 将 port2 发送到 Web Worker
                worker.postMessage({ port: port2 }, [port2]);

                // 设置 port1 的消息处理程序
                port1.onmessage = (event) => {
                    console.log('主线程收到消息:', event.data);
                };
            }

            function sendMessage() {
                if (port1) {
                    // 通过 port1 发送消息到 Web Worker
                    port1.postMessage('Hello from main thread');
                }
            }
        </script>
    </body>
    </html>
  ```
  - Web Worker 代码（worker.js）
  ```js
    let port;
    onmessage = (event) => {
        if (event.data.port) {
            // 接收主线程传递的 port2
            port = event.data.port;

            // 设置 port2 的消息处理程序
            port.onmessage = (event) => {
                console.log('Worker 收到消息:', event.data);

                // 通过 port2 发送消息回主线程
                port.postMessage('Hello from worker');
            };
        }
    };
  ```

## requestIdleCallback
* 概念
  - 是浏览器提供的一个 API，用于在浏览器空闲时执行一些低优先级的任务。它允许开发者在主线程空闲时执行后台和低优先级的工作，而不会影响关键的用户交互。
* 使用方法
  - requestIdleCallback 接受一个回调函数，该函数会在浏览器空闲时被调用。
  + 回调函数会接收一个 IdleDeadline 对象作为参数，该对象包含以下属性和方法：
    - timeRemaining(): 返回当前空闲时间的剩余毫秒数。
    - didTimeout: 一个布尔值，表示回调函数是否因为超时而被调用。
* 示例
  ```js
    function myNonEssentialWork(deadline) {
        while (deadline.timeRemaining() > 0 && tasks.length > 0) {
            performTask(tasks.pop());
        }
        if (tasks.length > 0) {
            requestIdleCallback(myNonEssentialWork);
        }
    }
    // 开始执行非关键任务
    requestIdleCallback(myNonEssentialWork);
  ```
* 使用场景
  >有兼容性和实现差异问题
  - 性能优化：在浏览器空闲时执行一些不紧急的任务，如预加载数据、懒加载图片等，以避免阻塞主线程，提升用户体验。
  - 后台任务：处理一些后台任务，如日志记录、数据同步等，这些任务不需要立即完成，可以在浏览器空闲时执行。
  - 动画和渲染：在空闲时间执行一些动画或渲染任务，以确保这些任务不会影响用户的交互体验。
