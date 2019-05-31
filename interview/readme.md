# 面试（基础为重,每项越往前越重要）
> 重点要知道如何组织语言去描述
## css
### 几种盒模型的理解，对比
* 标准盒模型
* 弹性盒模型(flex)
* 怪异盒模型(ie)

### CSS3用过哪些新特性

### 几种定位详细介绍
- 5种定位

### CSS优先级算法如何计算？
1. 优先级就近原则，同权重情况下样式定义最近者为准;
2. 载入样式以最后载入的定位为准;
3. 具体的优先级为: !important >  id > class > tag  important 比 内联优先级高

## html
* 简单描述页面的渲染过程
    1. 根据html结构生成dom树
    2. dom树与css结合生成渲染树
    3. 浏览器会将所有元素渲染到页面中

* iframe有那些缺点？
  - iframe会阻塞主页面的onload事件；
  - 搜索引擎的检索程序无法解读这种页面，不利于SEO;
  - iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
  - 如何避免：js动态给iframe添加src属性值，绕开以上两个问题

* 元素的分类
    1. 行内元素：a b span  select strong 行内块：img input
    2. 块级元素：div ul li ol dl dt dd h1-h5 p
    3. 常见的空元素：
        <br> <hr> <img> <input> <link> <meta>
        鲜为人知的是：
        <area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>

* HTML5新增了哪些内容或API，使用过哪些

* 用一个div模拟textarea的实现
    ```html
        <div id="textarea" contenteditable="true"></div>
    ```

* 移动设备忽略将页面中的数字识别为电话号码的方法 
 - <meta content="telephone=no,email=no" name="format-detection">

* form 中的readonly disable 区别
    - readonly 后台能接受到值
    - disable 获取不到

## js
### js 运行机制
JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤：
1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

4. 主线程不断重复上面的第三步。
主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 消息队列中存放的是一个个的任务（task）。 规范中规定 task 分为两大类，分别是 macro task 和 micro task，并且每个 macro task 结束后，都要清空所有的 micro task。

### 事件冒泡与捕获

### Var Let Const区别 
 - var 在浏览器预解析时存在变量提升，未声明可以使用
 - let 不存在变量提升,未声明就使用，会报错（暂时性死区）
 - const声明一个只读的常量。一旦声明常量的值就不能改变。



## vue
### Vue生命周期过程（如何描述）

### Vue在created 与mouted 在mouted中获取数据的好处

### Vue中的插槽

### Vue 计算属性和 watch 在什么场景下使用

### Vue 组件中 data 为什么是个函数

### Vue 的 nexttick 实现的原理

### Object.defineProperty() 和 proxy 的区别
1. Proxy可以直接监听对象而非属性
2. Proxy可以直接监听数组的变化

### 使用前端框架（angular/vue/react）带来哪些好处，相对于使用jQuery
* 数据驱动，避免操作dom
* 性能好
    - vdom 技术的使用
    - vue 技术依赖追踪，diff算法最小化的改变dom


## 通讯
### get/post
1. 请求方式不同(get/post)
2. 在请求正文上 
    post请求 输入的信息在请求信息的请求正文中
    get请求   请求正文在请求地址后面 url？+key=value&key1=value1
3. 在请求头中
    post需要写Content-Type:application/x-www-form-urlencoded
4. 在请求内容的长度上
    get请求的内容的长度是有限的 
    post请求的的内容的长度是无限的
5. 在安全问题上
    get请求相对来说不安全
    post请求是相对安全的        
6.  get 请求有缓存的效果

### 跨域
1. 原因：浏览器的安全策略
    * 同源策略:
        是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。

2. 什么是跨域
    * 跨域：不同源则跨域（域名，协议，端口完全不相同）

3.  跨域方案：
        1、顶级域名相同的可以通过domain.name来解决，
        即同时设置 domain.name = 顶级域名（如example.com）
        2、document.domain + iframe
        3、window.name + iframe
        4、location.hash + iframe
        5、window.postMessage()

    * 前端处理
        - jquery jsonp:
        原理：利用了<script src=""></script>标签具有可跨域的特性，
            由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来
            只能以GET方式请求
        - node 做代理
    * 服务端处理
      - cors 服务器响应了响应头: Access-Control-Allow-Origin http 协议规定.
        header("Access-Control-Allow-Origin:*");
      - nginx 做代理

        
   






## 面试遇见的笔试题
* jq 获取页面所有的input，并打印name 的值
    ```js
        $('input').each(function(){
            console.log($(this).prop('name'))
        })
    ```

* 下面alert 结果
    ```js
        var tt="aa"
        function test(){
            alert(tt)
            var tt='dd'
            alert(tt)
        }
        test()

    // 考察的是函数变量提升
     var tt="aa"
     function test(){
         var tt;
            alert(tt)
            tt='dd'
            alert(tt)
        }
       // undefined
       //  dd
    ```
    
* 变量提升与异步
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
    ```