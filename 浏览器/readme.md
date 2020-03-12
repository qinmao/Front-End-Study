# (*)浏览器
## 宏观角度下的浏览器
### Chrome架构(当前)：仅仅打开了1个页面，为什么有4(至少)个进程？
 + 进程
    - 一个进程就是一个程序运行的实例，每一个应用程序都至少有一个进程
    - 进程是用来给应用程序体用一个执行的环境，给应用程序分配资源的一个单位
 + 线程
    - 用来执行应用程序中的代码
    - 在一个进程内部，有很多的线程

 + 最新的 Chrome 浏览器包括：
  - 1 个浏览器（Browser）主进程：负责界面显示、用户交互、子进程管理，同时提供存储等功能

  - 1 个 GPU 进程：Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。

  - 1 个网络（NetWork）进程：负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程

  - 多个渲染进程：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下

  - 多个插件进程：主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

 + 当前多进程架构的优缺点
  - 优点：多进程模型提升了浏览器的稳定性、流畅性和安全性
  - 缺点：更高的资源占用、更复杂的体系架构
  >针对当前的问题谷歌提出了面向服务的架构
  > 也就是说 Chrome 整体架构会朝向现代操作系统所采用的“面向服务的架构” 方向发展，原来的各种模块会被重构成独立的服务（Service），每个服务（Service）都可以在独立的进程中运行，访问服务（Service）必须使用定义好的接口，通过 IPC 来通信，从而构建一个更内聚、松耦合、易于维护和扩展的系统

### TCP协议：如何保证页面文件能被完整送达浏览器？
+ tcp 和 udp 的区别？
 -  UDP 不能保证数据可靠性，但是传输速度却非常快，所以 UDP 会应用在一些关注速度、但不那么严格要求数据完整性的领域，如在线视频、互动游戏等。
 - 是一种面向连接的、可靠的、基于字节流的传输层通信协议，1）数据包丢失的情况，TCP 提供重传机制；2）TCP 引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件

+ TCP 连接的生命周期：
 - 建立连接阶段：通过“三次握手”来建立客户端和服务器之间的连接。所谓三次握手，是指在建立一个 TCP 连接时，客户端和服务器总共要发送三个数据包以确认连接的建立
 - 传输数据阶段：接收端在接收到数据包之后，需要发送确认数据包给发送端。当发送端发送了一个数据包之后，在规定时间内没有接收到接收端反馈的确认消息，则判断为数据包丢失，并触发发送端的重发机制。同样，一个大的文件在传输过程中会被拆分成很多小的数据包，这些数据包到达接收端后，接收端会按照 TCP 头中的序号为其排序，从而保证组成完整的数据。
 - 断开连接阶段：数据传输完毕之后，就要终止连接了，涉及到最后一个阶段“四次挥手”来保证双方都能断开连接。

### HTTP请求流程：为什么很多站点第二次打开速度会很快？
- DNS 缓存和页面资源缓存这两块数据是会被浏览器缓存的

### （*）导航流程：从输入URL到页面展示，这中间发生了什么？
+ 浏览器的每个进程的主要职责?
  - 浏览器进程：用户交互、子进程管理和文件储存等功能。
  - 网络进程：面向渲染进程和浏览器进程等提供网络下载功能。
  - 渲染进程：把从网络下载的 HTML、JavaScript、CSS、图片等资源解析为可以显示和交互的页面。因为 渲染进程所有的内容都是通过网络获取的，会存在一些恶意代码利用浏览器漏洞对系统进行攻击，所以运行在渲染进程里面的代码是不被信任的。这也是为什么 Chrome 会让渲染进程运行在安全沙箱里，就是为了保证系统的安全。

+ 输入URL到页面展示需要经历的几个主要的阶段
+ 用户发出 URL 请求到页面开始解析的这个过程，就叫做导航
  - 首先，浏览器进程接收到用户输入的 URL 请求，浏览器进程便将该 URL 转发给网络进程。
  - 然后，在网络进程中发起真正的 URL 请求。
  - 接着，网络进程接收到了响应头数据，便解析响应头数据，并将数据转发给浏览器进程。
  - 浏览器进程接收到网络进程的响应头数据之后，发送“提交导航 (CommitNavigation)”消息到渲染进程；
  - 渲染进程接收到“提交导航”的消息之后，便开始准备接收 HTML 数据，接收数据的方式是直接和网络进程建立数据管道；
  - 最后渲染进程会向浏览器进程“确认提交”，这是告诉浏览器进程：“已经准备好接受和解析页面数据了”。
 - 浏览器进程接收到渲染进程“提交文档”的消息之后，便开始移除之前旧的文档，然后更新浏览器进程中的页面状态。

 * 各阶段经历的详细的过程
    1. 用户输入：根据输入的内容构建url
    2. URL 请求过程:浏览器进程通过进程间通信（IPC）把 URL 请求发送至网络进程,发起请求，首先检测本地缓存，有返回，无，DNS解析出主机的ip，根据协议不同，建立不同的连接，https 则建立tls连接，之后通过ip与服务器建立tcp连接 ,网络进程收到服务器响应信息，解析。
    - 重定向：返回的状态码是301或者302，取响应头Location的值，重新请求，否则200 继续处理请求
    - 响应类型数据处理：根据响应头 Content-Type 的值来显示响应体的内容，其 Content-Type 的值是 application/octet-stream，显示数据是字节流类型的，一般浏览器会按照下载类型来处理该请求
    3. 准备渲染进程:默认情况下，Chrome 会为每个页面分配一个渲染进程,但同一个站点（指根域名和协议相同），会共用一个渲染进程
    4. 提交文档：指浏览器进程将网络进程接收到的 HTML 数据提交给渲染进程，具体流程是这样的：
    - 首先浏览器进程接收到网络进程的响应头数据之后，便向渲染进程发起“提交文档”的消息；
    - 渲染进程接收到“提交文档”的消息后，会和网络进程建立传输数据的“管道”；
    - 等文档数据传输完成之后，渲染进程会返回“确认提交”的消息给浏览器进程；
    - 浏览器进程在收到“确认提交”的消息后，会更新浏览器界面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新 Web 页面。
    5. 渲染阶段：一旦文档被提交，渲染进程便开始页面解析和子资源加载了

### （*）渲染流程：HTML、CSS、JS 是如何变成页面的？
- 渲染流程的前三个阶段：DOM 生成、样式计算和布局
+ 完整的渲染流程：
1. 渲染进程将 HTML 内容转换为能够读懂的 DOM 树结构。
2. 渲染引擎将 CSS 样式表转化为浏览器可以理解的 styleSheets，计算出 DOM 节点的样式。
3. 创建布局树，并计算元素的布局信息。
4. 对布局树进行分层，并生成分层树。
5. 为每个图层生成绘制列表，并将其提交到合成线程。
6. 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
7. 合成线程发送绘制图块命令 DrawQuad 给浏览器进程。
8. 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上。

* 三个和渲染流水线相关的概念——“重排”“重绘”和“合成”
 + 重排:更新了元素的几何属性,重排需要更新完整的渲染流水线，所以开销也是最大的。
 + 重绘：更新元素的绘制属性，重绘省去了布局和分层阶段，所以执行效率会比重排操作要高一些。
 + 合成：更改既不要布局也不要绘制的属性，渲染引擎将跳过布局和绘制，只执行后续的合成操作，例如：使用了 CSS 的 transform 来实现动画效果，这可以避开重排和重绘阶段，直接在非主线程上执行合成动画操作

* 如何减少重绘、重排？
  1. 使用 class 操作样式，而不是频繁操作 style
  2. 避免使用 table 布局
  3. 批量dom 操作，例如 createDocumentFragment，或者使用框架React
  4. Debounce window resize 事件
  5. 对 dom 属性的读写要分离
  6. will-change: transform 做优化

## 浏览器中的js执行机制
### 变量提升：JavaScript代码是按顺序执行的吗？
+ js预解析阶段
  1. 语法分析：保证js代码符合语法规则，能被正确的执行。
  2. 变量名以及函数名提升
  3. 确定变量的作用域。

+ 变量提升
>先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部
 - ```javascript
    'use strict';
    function foo() {
        var x = 'Hello, ' + y;
        alert(x);
        var y = 'Bob';
    }
    foo();
    // 虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。
    // 但是alert显示Hello, undefined，说明变量y的值为undefined。
    // 这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。

    // 变量提升后代码：
    function foo() {
        var y; // 提升变量y的申明
        var x = 'Hello, ' + y;
        alert(x);
        y = 'Bob';
    }     
    // 函数内变量的怪异声明模式:
    function fun(){
        num=10   //没写var 就相当于全局变量
    }
    fun()
    console.log(num) //10
  ```
### 方法
 * Var Let Const区别 
   - var 在浏览器预解析时存在变量提升，未声明可以使用
   - let 不存在变量提升,未声明就使用，会报错（暂时性死区),只在代码块内有效
   - const 声明一个只读的常量。一旦声明常量的值就不能改变。
    (对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了)
    
 * 综合考察
    ``` js
    for (var index = 0; index < 10; index++) {
            setTimeout(() => {
                console.log(index)
            },0 ); 
    }
    // 涉及到js 执行机制 执行栈同步执行完，把异步队列拿到栈执行10 次 
    // 输出10 次10 

    for (let index = 0; index < 10; index++) {
        setTimeout(fucntion(){
            console.log(index)
        },0 );
    }

    // 块级作用域
    // 输出的结果 0一直到9，也可以用闭包来实现
    for (var index = 0; index < 10; index++) {
           (function(index){
            setTimeout(fucntion(){
                console.log(index)
            },0 );
           })(index);
    }

    ```

### js的三种加载方式
* 正常:JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。
    ```js
        <script src="index.js"></script>
    ```
* async:JS 不会阻塞浏览器,它的加载是异步的，当它加载结束，JS 脚本会立即执行。
    ```js
        <script async src="index.js"></script>
    ```
* defer:JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行
    ```js
        <script defer src="index.js"></script>
    ```

### 本地存储
* cookie:如果用于保存用户登录态，应该将该值加密
    - 一般有服务器生成，可以设置过期时间
    - 容量较小，4kb 左右
    - 每次请求都会携带在header中
    + document.cookie的属性
        - expires 设置过期时间,被max-age属性所取代，max-age用秒来设置cookie的生存期
        - path cookie关联在一起的网页
        - domain 多个web服务器共享cookie
* localStorage
    - 一直存在，除非被清理
    - 容量5m 左右
    - 不参与服务器通讯
* sessionStorage
    - 用法类似localStorage
    - 页面关闭就清理
* indexDB
    - 浏览器端的数据库，不被清理一直存在

### 事件机制
 * 页面事件的加载顺序
    - DOMCententLoaded事件：页面的文档结构（DOM树）加载完之后就会触发
    - document.onload 是在结构和样式加载完才执行js
    - window.onload：不仅结构和样式加载完，还要执行完所有的外部样式、图片这些资源文件，全部加载完才会触发

 * 事件冒泡和事件捕获   
    - 事件冒泡：从里向外执行，遇到相同的事件及执行
    - 事件捕获：执行顺序与冒泡相反（不推荐使用，因为ie使用attachEvent 没有第三个参数）

 * 事件触发三阶段
    1. window 往事件触发处传播，遇到注册的捕获事件会触发
    2. 传播到事件触发处时触发注册的事件
    3. 从事件触发处往 window 传播，遇到注册的冒泡事件会触发

 * 事件注册(监听) addEventListener（避免事件被覆盖）
    > ie9 以下不支持 false默认冒泡 true 捕获
    + 第三个参数为bool,该参数默认值为 false(冒泡) ，useCapture 决定了注册的事件是捕获事件还是冒泡事件
    + 作为对象：
        - capture：布尔值，和 useCapture 作用一样
        - once：布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
        - passive：布尔值，表示永远不会调用 preventDefault
        ```javascript
            node.addEventListener(enventType,fn，false)

            btn.addEventListener("click",fun)
            // 移除事件监听(参数必须一致)
            btn.removeEventListener("click",fun)
                
            // ie-6-10(enventType 加on)
            node.attachEvent(enventType,fn)
            node.detachEvent(enventType,fn)
        ```
    + 阻止事件冒泡:(一般来说，如果我们只希望事件只触发在目标上)
        - ```js
            node.addEventListener(
                'click',
                e => {
                    // 阻止事件冒泡,也可以阻止捕获事件
                    e.stopPropagation() 
                    // 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。
                    e.stopImmediatePropagation()
                    console.log('冒泡')
                },
                false
            )

            // 点击 node 只会执行上面的函数，该函数不会执行
            node.addEventListener(
                'click',
                event => {
                    console.log('捕获 ')
                },
                true
            )
        ```
 * 事件触发(标准浏览器)：dispatchEvent
    + element.dispatchEvent()
    + 使用该方法：
        + 创建: document.createEvent()
            - 返回新创建的Event对象
            - 参数：
            -  HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select', 'submit', 'unload'. 事件
            - UIEvents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'. 间接包含 MouseEvents. 
            - MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'. 
            - MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved', 'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument','DOMNodeRemovedFromDocument', 'DOMSubtreeModified'
            
        + 初始化: initEvent(eventName, canBubble, preventDefault)
            - initEvent() 方法用于初始化通过DocumentEvent接口创建的Event的值。
            - canBubble 是否可以冒泡
            - preventDefault 是否阻止事件的默认操作

        + 例子：
            ```js
                // 举个例子：
                var dom = document.querySelector('#id')
                document.addEventListener('alert', function (event) {
                    console.log(event)
                }, false);
                
                // 创建
                var evt = document.createEvent("HTMLEvents");
                // 初始化
                evt.initEvent("alert", false, false);
                // 触发, 即弹出文字
                dom.dispatchEvent(evt);
            ```
    + 自定义事件
        - 自定义事件的函数有 Event、CustomEvent 和 dispatchEvent
        - ```js
            // 向 window派发一个resize内置事件
            window.dispatchEvent(new Event('resize'))
            
            // 直接自定义事件，使用 Event 构造函数：
            var event = new Event('build');
            var elem = document.querySelector('#id')
            // 监听事件
            elem.addEventListener('build', function (e) { ... }, false);
            // 触发事件.
            elem.dispatchEvent(event);
        ```

 * 事件的对象(event.target)
    > 记录当前事件触发时的一些信息
   + btn.onclick=function(event){} 
     - event.target 真正触发事件的元素
     - event.type="click"
     - event.clinetX/clinetY 
     - ie 低版本不兼容 var tar = e.target||e.srcElement

 * 事件代理/委托
  > 本质就是利用事件冒泡的原理，将事件绑定在父容器中，让父容器代为触发
    - 应用的场景：动态生成的子节点要注册事件，那么子节点需要注册事件的话应该注册在父节点上
  + 好处：
    1. 减少了事件的注册，内存开销减少了
    2. 元素的增减不会影响事件的绑定
    3. js和DOM节点之间的关联变少了，减少了因循环引用(GC中引用计数法的缺陷)而带来的内存泄漏发生的概率。

  + jq 早期 bind 绑定事件会出现一个问题及新创建的元素没有事件，后来用delegate解决1.7 版本后统一用on

  + 注意：
    - 不是所有的事件都有冒泡（blur、focus、load和unload），所以事件委托不是所有的事件都可用。
    - 例如mouseover 由于事件对象target 频繁改动会有性能问题


## Event Loop
 * JS 执行是单线程的，它是基于事件循环的。

 * js语言为什么设计成单线程的？
    - 避免多线程操作同一文件（资源）产生冲突。
    - 提高js性能

 * brower
    1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

    2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

    3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，放入执行栈，开始执行。

    4. 主线程不断重复上面的第三步。
    主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 消息队列中存放的是一个个的任务（task）。

 * 规范中规定 task 分为两大类:我们把宿主发起的任务称为宏观任务，把js引擎发起的任务称为微观任务
    + macro task（宏任务）
        - script 
        - setTimeout 
        - setInterval
        - setImmediate 
        - I/O 
        - UI rendering

    + micro task（微任务）
        - process.nextTick（Node 独有）
        - promise 
        - MutationObserver

 * node

## promise 
   * what?
        - Promise 是异步编程的一种解决方案,用同步的书写方式开发异步的代码，解决回调地狱的问题
        - ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
        - Promise 新建后就会立即执行
   * 有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）
      ```js
            // 基本用法
            var promise = new Promise(function(resolve, reject) {
                if (/* 异步操作成功 */){
                    resolve(value);
                } else {
                    reject(error);
                }
            });
            //  用promise 封装一个ajax
           const getJSON = function(url) {
            const promise = new Promise(function(resolve, reject){
                const handler = function() {
                    if (this.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                    };
                    const client = new XMLHttpRequest();
                    client.open("GET", url);
                    client.onreadystatechange = handler;
                    client.responseType = "json";
                    client.setRequestHeader("Accept", "application/json");
                    client.send();
                });
                return promise;
            };

            getJSON("/posts.json")
            .then(function(json) {
                console.log('Contents: ' + json);
            })
            .catch(error=>{
                console.error('出错了', error);
            })

        ```
   * Promise.prototype.then() 
   * Promise.prototype.catch()
   * Promise.prototype.finally()
     - then resolve 的回调 
     - catch reject的回调 
     - finally Promise 对象最后状态如何，都会执行的操作
   * promise.all 和 promise.race 
    - Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    - promise.race
   * 使用场景：
   * 区别：
 * async
    - 表示这是一个async函数,一个函数如果加上 async ，那么该函数就会返回一个 Promise
 * await 
    - 表示在这里等待promise返回结果了，再继续执行。
    - await 后面跟着的应该是一个promise对象（其他返回值也没关系，只是会立即执行，不过那样就没有意义）
    - await 命令就是内部then命令的语法糖。
 * 问题?
    - Promise里的代码为什么比setTimeout先执行？
    - vue 异步更新是包装成macro task还是micro task(为什么)？
 * 事件循环每一次循环都是一个这样的过程
    <image src='framework/vue/vue2.x/images/event-loop-queue.png'>
    + 根据上图的执行过程，分析如下
        1. setTimeout 是一个宏任务，所以推入了宏任务队列
        2. 由于script 也是一个宏任务，也会被放入队列，由于该队列是一个一个执行的，所以本次循环，setTimeout 中不会被渲染，下次循环执行
        3. 如果异步更新包装在micro task 中，队列中先执行script ，微任务是一对对执行的，所以Promise在本次循环被执行了，也就是渲染了

## 浏览器安全
 * xss
    - 一般通过一段代码注入到网页中
    - 场景：在评论中如果前后端不做处理，输入<script>alert('操')</script>
    + 防御：
        - 简单的通过转义字符对于引号、尖括号、斜杠进行转义
        - ```js
            function escape(str) {
                str = str.replace(/&/g, '&amp;')
                str = str.replace(/</g, '&lt;')
                str = str.replace(/>/g, '&gt;')
                str = str.replace(/"/g, '&quto;')
                str = str.replace(/'/g, '&#39;')
                str = str.replace(/`/g, '&#96;')
                str = str.replace(/\//g, '&#x2F;')
            return str
            }
            ```
        - 对于富文本通常用白名单、黑名单方式
        - ```js
            const xss = require('xss')
            let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
            // -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
            console.log(html)
            // 以上示例使用了 js-xss 来实现，可以看到在输出中保留了 h1 标签且过滤了 script 标签。
           ```
        - csp 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行
        - 开启csp:
            1. 设置 HTTP Header 中的 Content-Security-Policy
            ```html
                <!-- 只允许加载本站资源 -->
                Content-Security-Policy: default-src ‘self’
                <!-- 只允许加载 HTTPS 协议图片 -->
                Content-Security-Policy: img-src https://*
                <!-- 更多规则参考mdn -->
            ```
            2. 设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">
 * CSRF
    - 中文名为跨站请求伪造,原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求
    - 场景：假设网站中有一个通过 GET 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口
    防御：
        - Get 请求不对数据进行修改
        - 不让第三方网站访问到用户 Cookie
        - 阻止第三方网站请求接口
        - 请求时附带验证信息，比如验证码或者 Token
        - 对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。
 * 点击劫持
    - 攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
    - 防御：X-FRAME-OPTIONS  是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。
    - DENY，表示页面不允许通过 iframe 的方式展示
    - SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
    - ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
 * 中间人攻击 
    - 通常来说不建议使用公共的 Wi-Fi，中间人攻击拦截得到敏感信息
    - 通常使用https建立安全的通道