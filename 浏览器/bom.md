# bom 的基础知识
> 浏览器对象模型
## 系统对话框 
 - window.alert() 
 - window.prompt() 
 - window.confirm()

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
* 属性：length，返回浏览器历史列表中的url 数量
* 方法：
  - back
  - forward
  + go  
    * 哈希模式
        - 利用了window可以监听hashchange事件，url中的哈希值（#后面的值）如果有变化，前端可以做到监听
        - 前端并没有发起http请求他也能够找到对应页面的代码块进行按需加载。
            ```js
                window.addEventListener('hashchange', () => {
                    // ... 具体逻辑
                })
            ```
    * history模式
        - pushState与replaceState,作用就是可以将url替换并且不刷新页面
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
- 通过这个对象可以获得浏览器的浏览器的种类、版本号等属性
- userAgent 获取浏览器类型

## postMessage
> 解决跨域和跨页面通信的问题
+ web开发的时候遇到的消息传递的问题
  - 多窗口之间消息传递(newWin = window.open(..));
  - 页面与嵌套的iframe消息传递

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
  ```
+ MessageEvent的属性
  - data：顾名思义，是传递来的message
  - source：发送消息的窗口对象
  - origin：发送消息窗口的源（协议+主机+端口号）

## iframe
  + contentWindow 获取iframe的window对象
  + contentDocument 获取iframe的document对象
  + 如何检测iframe 是否加载完成
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
    - iframe会阻塞主页面的onload事件
    - iframe和主页面共享连接池，而浏览器对相同域(同一域名)的连接有限制，所以会影响页面的并行加载
    - 如何避免：js动态给iframe添加src属性值，绕开以上两个问题