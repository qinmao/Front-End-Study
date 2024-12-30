# bom 的基础知识
> 浏览器对象模型
## 系统对话框 
 - window.alert
 - window.prompt
 - window.confirm
## location
* 属性
  - hash 返回URL#后面的内容，如果没有#，返回空
  - host 返回URL中的域名部分
  - hostname URL中的主域名部分
  - href 返回或设置当前文档的URL 
  - origin
  - pathname 返回URL的域名后的部分
  - port
  - protocol 返回URL中的协议部分
  - search 返回URL中的查询字符串部分。
  ```
  例如 http://www.dreamdu.com  dreamdu.php?id=5&name=dreamdu 返回包括(?)后面的内容?id=5&name=dreamdu
  ```

* 方法:
  - assign 加载新的文档
  - reload 重新加载
  - replace 新文档替换当前文档（无历史记录）

* 编码解码
  - encodeURI encodeURIComponent 
  - 把字符串作为 URI 进行编码。
  - 如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 
  - decodeURI 函数可对 encodeURI() 函数编码过的 URI 进行解码
  - decodeURIComponent
## history 
* 属性：length，返回浏览器历史列表中的 url 数量
* 方法：
  - back
  - forward
  + go  
    * 哈希模式
        - 利用了 window 可以监听 hashchange 事件，url 中的哈希值（#后面的值）如果有变化，前端可以做到监听
        - 前端并没有发起http请求他也能够找到对应页面的代码块进行按需加载。
            ```js
                window.addEventListener('hashchange', () => {
                    // ... 具体逻辑
                })
            ```
    * history模式
        - pushState 与 replaceState,作用就是可以将url替换并且不刷新页面
         ```js
            // 新增历史记录
            history.pushState(stateObject, title, URL)
            // 替换当前历史记录
            history.replaceState(stateObject, title, URL)

            // 点击后退按钮时会触发 popState 事件
            window.addEventListener('popstate', e => {
                // e.state 就是 pushState(stateObject) 中的 stateObject
                console.log(e.state)
            })
         ```
## navigator
  - 通过这个对象可以获得浏览器的浏览器(webview)的种类、版本号等属性
  - userAgent 获取浏览器类型
## iframe
  + contentWindow 获取 iframe 的 window 对象
  + contentDocument 获取 iframe 的 document 对象
  + 如何检测 iframe 是否加载完成
    ```js
        var iframe = document.createElement("iframe");
        iframe.src = "http://www.planabc.net";
        if (iframe.attachEvent){    
            iframe.attachEvent("onload", function(){        
                alert("Local iframe is now loaded.");    
            });
        } else {    
            iframe.onload = function(){        
                alert("Local iframe is now loaded.");    
            };
        }
        document.body.appendChild(iframe);
    ```
  + 有那些缺点？
    - 搜索引擎的检索程序无法解读这种页面，不利于SEO;
    - iframe 会阻塞主页面的 onload 事件
    - iframe 和主页面共享连接池，而浏览器对相同域(同一域名)的连接有限制，所以会影响页面的并行加载
    - 如何避免：js 动态给 iframe 添加src属性值，绕开以上两个问题
## postMessage
> 解决跨域和跨页面通信的问题
+ web开发的时候遇到的消息传递的问题
  - 多窗口之间消息传递(newWin = window.open(..));
  - 页面与嵌套的 iframe 消息传递

+ postMessage(data,origin)
  - data:要传递的数据（JSON.stringify()方法对对象参数序列化 处理兼容性问题）
  - origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，
  >someWindow.postMessage()方法只会在someWindow所在的源(url的protocol, host, port)和指定源一致时才会成功触发message event，也可以将参数设置为"##"，someWindow可以在任意源，指定和当前窗口同源的话设置为"/"

+ 监听消息
  ```js
    window.addEventListener('message', function(messageEvent) {
          var data = messageEvent.data; // messageEvent: {source, currentTarget, data}
          console.info('message from child:', data);
    }, false);

    // 以上监听会导致收到消息后执行多次的问题，用以下的方式可以避免
    // messageEvent: 
    // data：顾名思义，是传递来的message
    // source：发送消息的窗口对象
    // origin：发送消息窗口的源（协议+主机+端口号）
    window.onmessage=function(messageEvent) {
        var data = messageEvent.data;
        console.info('message from child:', data);
      }
  ```

## FileReader
> FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
* 常见的用法
```js
    // 读取图片
    const reader = new FileReader()
        // reader.readAsDataURL(input.files[0])
        reader.readAsDataURL(blob)

        reader.onload=function(e){
        // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL 格式的 Base64 字符串以表示所读取文件的内容。
        // e.target.result 图片的base64位编码
        // 直接给img 的src 赋值可以显示图片
    }

    // 读取网页文件，并重新编码
    const reader = new FileReader();
        reader.onload = function (e) {
            // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
            const htmlData = reader.result;
            console.log(htmlData);
        };
    reader.readAsText(blob, "GBK");

```