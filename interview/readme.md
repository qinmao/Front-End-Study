# 面试（基础为重）
> 重点要知道如何组织语言去描述
## css
### 几种盒模型的理解，对比
* 标准盒模型
* 弹性盒模型(flex)
* 怪异盒模型(ie)

### 常用的布局

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

* iframe
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
  - iframe会阻塞主页面的onload事件；
  - 搜索引擎的检索程序无法解读这种页面，不利于SEO;
  - iframe和主页面共享连接池，而浏览器对相同域(同一域名)的连接有限制，所以会影响页面的并行加载。
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

## js（es6）
### js 事件循环和nodejs事件循环，及区别

### 事件冒泡与捕获，事件委托（代理）

### 闭包、应用、出现的问题及解决

### 原型与原型链，几种继承优缺点（借调、组合式，寄生组合式）

### Var Let Const区别 

### promise

### class

### 箭头函数几种this指向问题

## vue
### 如何理解mvvm

### 数据响应式原理，vnode
> Object.defineProperty() 和 proxy 的区别
1. Proxy可以直接监听对象而非属性
2. Proxy可以直接监听数组的变化

### emit/on/off/once (原理)实现一个发布订阅系统

### vuex 结合项目的使用

### 如何抽取组件，封住组件要考虑哪些问题、抽取哪些组件？

### 使用前端框架（angular/vue/react）带来哪些好处，相对于使用jQuery
* 数据驱动，避免操作dom
* 性能好
    - vdom 技术的使用
    - vue 依赖追踪，diff算法最小化的改变dom

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

## js基本功
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


* 快排
* 去重
    ```js
    Array.prototype.unique = function () {
                var obj = {}
                var res = []
                for (let i = 0; i < this.length; i++) {
                    if (!obj[this[i]]) {
                        res.push(this[i])
                        obj[this[i]] = 1
                    }
                }
                return res;
            }
    ```
* 反转
* 冒泡
    ```js
    function sort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    flag = false;
                }
            }
        }
        return arr;
    }
    ```

## 手写函数
* 防抖、节流
* 图片懒加载

## webpack
* webpack 与gulp 区别，如何混用？
* webpack 打包过程
* webpack 热更新原理
* 在项目构建中做了哪些优化？

## h5 混合应用在安卓端webview遇到的问题

## 小程序

## node辅助前端可以做哪些工作
* 本地开发，做web服务，接口代理处理跨域
* 自动生成组件文件
* 处理不同项目的接口的中间层