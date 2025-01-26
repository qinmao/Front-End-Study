# bom
- 浏览器对象模型，Browser Object Model是指浏览器提供的一组对象，用于与浏览器窗口进行交互

## window对象：表示浏览器窗口，是所有其他对象的全局对象。
  ```js
    // 打开新窗口：
    window.open('https://www.example.com', '_blank');
    // 关闭窗口：
    window.close();

    // 设置定时器：
    const timerId = window.setTimeout(() => {
        console.log('定时器触发');
    }, 1000);

    window.clearTimeout(timerId); // 清除定时器

    // 设置间隔器：
    const intervalId = window.setInterval(() => {
        console.log('间隔器触发');
    }, 1000);

    window.clearInterval(intervalId); // 清除间隔器

    // 系统弹窗
    // window.alert
    // window.prompt
   // window.confirm
  ```

## navigator对象：获取浏览器信息
```js
  console.log(navigator.userAgent); // 获取用户代理字符串
  console.log(navigator.platform); // 获取操作系统平台
```

## screen 对象：表示屏幕的信息，如屏幕分辨率、颜色深度等。
  ```js
    console.log(screen.width); // 屏幕宽度
    console.log(screen.height); // 屏幕高度
    console.log(screen.colorDepth); // 颜色深度
  ```

## location对象：表示当前页面的 URL 信息，可以用于获取或设置 URL。
* url属性信息
  - href 当前页面的 URL

  - hash 瞄点
  - host 域名
  - hostname 主机名
  - origin
  - pathname 域名后路径名
  - port
  - protocol 协议
  - search 查询字符串

* 方法:
  - assign 加载新的文档
  - reload 重新加载当前页面
  - replace 新文档替换当前文档（无历史记录）

* url编码解码:
  - URL 编码用于将特殊字符转换为百分号编码，以确保 URL 的有效性。解码则是将编码后的字符串还原为原始字符串。
  + encodeURI/encodeURIComponent 方法进行 URL 编码
    - encodeURIComponent：编码单个组件（如查询参数值）。
    - encodeURI 编码整个 URL
    ```js
        const url = 'https://www.example.com/search?q=测试&lang=zh';
        const encodedComponent = encodeURIComponent('测试&lang=zh');
        const encodedURL = encodeURI(url);

        console.log(encodedComponent); // 输出: %E6%B5%8B%E8%AF%95%26lang%3Dzh
        console.log(encodedURL); // 输出: https://www.example.com/search?q=%E6%B5%8B%E8%AF%95&lang=zh
    ```
  + decodeURI/decodeURIComponent 进行 URL 解码
    - decodeURIComponent：解码单个组件。
    - decodeURI：解码整个 URL。
    ```js
        const encodedComponent = '%E6%B5%8B%E8%AF%95%26lang%3Dzh';
        const encodedURL = 'https://www.example.com/search?q=%E6%B5%8B%E8%AF%95&lang=zh';

        const decodedComponent = decodeURIComponent(encodedComponent);
        const decodedURL = decodeURI(encodedURL);

        console.log(decodedComponent); // 输出: 测试&lang=zh
        console.log(decodedURL); // 输出: https://www.example.com/search?q=测试&lang=zh
   ```

## history对象：表示浏览器的历史记录，可以用于前进、后退等操作
* 属性：length，返回浏览器历史列表中的 url 数量
* 方法：
  ```js
    history.back();    // 后退到上一个页面
    history.forward(); // 前进到下一个页面
    history.go(-1);    // 后退一个页面，等同于 history.back()
    history.go(1);     // 前进一个页面，等同于 history.forward()
  ```
 
* 哈希模式
  - 可以监听 hashchange 事件，url 中的哈希值（#后面的值）如果有变化，前端可以做到监听
    ```js
        // 前端并没有发起http请求他也能够找到对应页面的代码块进行按需加载。
        window.addEventListener('hashchange', () => {
            // ... 具体逻辑
        })
    ```
* history模式
  - pushState 与 replaceState,作用就是可以将 url 替换并且不刷新页面
   ```js
      // 新增历史记录
      history.pushState(stateObject, title, URL)
      // 替换当前历史记录
      history.replaceState(stateObject, title, URL)

      // 监听popState 事件：点击后退按钮时会触发 
      window.addEventListener('popstate', e => {
        // e.state 就是 pushState(stateObject) 中的 stateObject
        console.log(e.state)
      })
   ```
