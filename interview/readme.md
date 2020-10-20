# 面试（基础为重）
> 重点要知道如何组织语言去描述
## css
* 用一个div模拟textarea的实现
    ```html
        <div id="textarea" contenteditable="true"></div>
    ```
* form 中的readonly disable 区别
    - readonly 后台能接受到值
    - disable 获取不到

## vue
* 如何理解mvvm

* 数据响应式原理，vnode
> Object.defineProperty() 和 proxy 的区别
 - Proxy可以直接监听对象而非属性
 - Proxy可以直接监听数组的变化

* emit/on/off/once (原理)实现一个发布订阅系统

* vuex 结合项目的使用

* 如何抽取组件，封装组件要考虑哪些问题、抽取哪些组件？

* 使用前端框架（angular/vue/react）带来哪些好处，相对于使用jQuery
  - 数据驱动，避免操作dom,操作不当可能导致内存泄漏
  - 性能好：体现在（vdom 技术的使用，vue 依赖追踪，diff算法最小化的改变dom）

## 通讯
* 跨域
  - 原因：浏览器的安全策略同源策略，所谓同源是指，域名，协议，端口完全相同。
  - 什么是跨域：不同源则跨域（域名，协议，端口完全不相同）
  - 前端 jquery jsonp:
        原理：利用了<script src=""></script>标签具有可跨域的特性，
            由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来
            只能以GET方式请求
  - 服务端处理
    - cors 服务器响应了响应头: Access-Control-Allow-Origin http 协议规定.
      header("Access-Control-Allow-Origin:*");
    - nginx 做代理
    - node 做代理

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
