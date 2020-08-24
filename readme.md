# 前端
> 前端的知识网络庞杂，知识点琐碎，记住所有的细节不太可能，所以往往需要做些总结，记录最核心的知识点，构建自己的知识网络。
## css
* [css核心基础](css/css基础知识.md)
* [css3核心基础](css/css3.md)
* [less](css/less/less.md)
* [sass](css/sass/readme.md)

## h5
* [h5 基础](html/html5/h5.md)
* [h5 mobile](mobile/h5-mobile.md)

## js 基础
* [js 基础](ECMA/js基础语法.md)
* [dom 基础](浏览器/dom.md)
* [bom 基础](浏览器/bom.md)

## 常用封装的函数
* [日期格式处理](js/date-format.js)
* [数字的格式处理](js/num-format.js)
* [数组的处理](js/array-util.js)
* [字符串的处理](js/string-util.js)

## (*)浏览器工作原理与http协议
* [工作原理与实践](浏览器/readme.md)
* [http协议](http/readme.md)

## 面向对象
- 原型与继承
- [常用的设计模式](desin-patterns/)

## 模块化
* ES6 之前，js的加载
    ```html
        <!--
            1. 正常:JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。--> 
        <script src="index.js"></script>
        <!-- 
            2. async:JS 不会阻塞浏览器,它的加载是异步的，当它加载结束，JS 脚本会立即执行 -->
            <script async src="index.js"></script>
        <!-- 
            3. defer:JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行-->
        <script defer src="index.js"></script>
    ```

 > ES6 之前，js没有module，不利于大程序的开发，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于node，后者用于浏览器。
 * 为什要模块化(有什么好处)
    - 解决命名冲突
    - 提供复用性
    - 提高代码可维护性

 * 有哪些模块化的方案
    + 沙箱模式(实质是匿名的立即执行函数)
        - 在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题
        - 例如jq插件开发

    + AMD 和 CMD
        - 现在很少看到
        - 用法如下
            ```javascript
                // AMD
                define(['./a', './b'], function(a, b) {
                    // 加载模块完毕可以使用
                    a.do()
                    b.do()
                })
                // CMD
                define(function(require, exports, module) {
                    // 加载模块
                    // 可以把 require 写在函数体的任意地方实现延迟加载
                    var a = require('./a')
                    a.doSomething()
                })
            ```

    + CommonJS
        - module.exports/require
        - 语法如下:
            ```javascript
                let { stat, exists, readFile } = require('fs');
                // 等同于
                let _fs = require('fs');
                let stat = _fs.stat;
                let exists = _fs.exists;
                let readfile = _fs.readfile;
            
            // 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
            // 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
            
            ```
        - module.exports是全局的对象 可简写成exports，
        - node 帮我们实现了var exports=module.exports，exports 就是 module.exports 的别名，初始值是空对象
        
    + es module
        - export/import
        - 语法:
            ```javascript
                // ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
                import { stat, exists, readFile } from 'fs';

                // 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
                // 这种加载称为“编译时加载”或者静态加载，效率要比 CommonJS 模块的加载方式高。
                // 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
            ```
        - ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";


 * ES6 模块与 CommonJS 模块的差异
    - es module 在编译时输出值的引用，CommonJS 在运行时输出一个值的拷贝
    - CommonJS 是同步导入，es 是异步的
    


## es6对js的扩展
* [es6](ECMA/es6.md)

## 正则表达式
* [正则表达式](note/reg.md)

## 移动端
### 事件
 * 移动端touch事件
    - 当用户手指放在移动设备在屏幕上滑动会触发的touch事件
    - touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
    - touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
    - touchend——当手指离开屏幕时触发
    - touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

 * TouchEvent说明：
    + touches：屏幕上所有手指的信息
        - targetTouches：手指在目标区域的手指信息
        - changedTouches：最近一次触发该事件的手指信息
        - touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

        + 参数信息(changedTouches[0])
            - clientX、clientY在显示区的坐标
            - target：当前元素

    + 事件响应顺序
        - ontouchstart  > ontouchmove  > ontouchend > onclick

### 适配
 * [适配](mobile/适配/readme.md)

## framework
> 前端常用的框架（方式不同，本质都是操作dom）
### 数据驱动式
 * [angular1](framework/angular1/angular-base.html)
 * [angular2](framework/angular2/angular.md)
 * [vue](framework/vue/vue.md)
 * [react](framework/react/readme.md)

### 手动式
 * [jq](framework/jq/readme.md)
 * [zepto](framework/zepto/readme.md)

## 跨平台技术
 * [Hybrid-App](/Hybrid-App/cordova.build.app.md)
 * [微信小程序](wx/readme.md)
 * react native
 * [weex/uni-app](cross-platform/weex)
 * flutter
 * [electron](cross-platform/electron/readme.md)

## 基于vue构建的项目
 * [spa](framework/vue/vue.md)
 * [ssr](framework/nuxt/readme.md)

## 前端优化
- [优化](前端优化/readme.md)

## 工程化
### 构建与打包工具
 * [gulp](build-tool/gulp/readme.md)
 * [webpack](build-tool/webpack/readme.md)

### 测试

### 监控

## 环境和工具
### mac 
 * brew[官网](http://brew.sh/index_zh-cn.html)
 
 * 安装:
    ``` 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

 * brew
    - brew install 软件名  brew uninstall  软件名称
    - brew list 可以查看所有安装的软件
    - brew info 软件名

### vscode 
 * 前端本地服务端调试
   - npm install -g live-server 
   - 安装报错就用npm install live-server -gf安装，
   - [详情](https://github.com/tapio/live-server#readme)

 * eslint
    - 是nodejs编写，提供一种代码编写规范。
    - 对代码静态分析，不用执行就可以查找不符合语法规则的代码。
    - 可以自定义代码编写的规则

    - 先全局或者本地安装
      npm i -g eslint
    - vscode 中 安装eslint 插件
    - terminal 中执行 eslint --init
    - [vscode use](http://www.cnblogs.com/IPrograming/p/VsCodeESLint.html)
    - [配置](note/eslint.md)
    - [参考](http://eslint.org/)

 * Emmet(快捷编写html，vscode 内置了该功能)
    ```css
        div.className
        div#idName
        div.className#idName
        h1{text}
        a[href="#"]
        ul>li*3>a[href="#"]
    ```

 * 好用的插件
    - file-size
    - html css support
    - minapp 
    - open in browser
    - vetur
    - vscode-icons
    - vueHelper
    - [参考](https://juejin.im/post/5e89fb596fb9a03c75753eb0?utm_source=gold_browser_extension#comment)
    
### 前端的工具
* Fontmin/字蛛
* ImageOptim
* 文档工具
    - dash
    - zeal
    
### windows 连接服务器的工具
 * fileZillaClint
 * Xshell

### git
* [git基本使用](git/readme.md)

## chrome插件的开发
 * 首先要有一个manifest.json清单文件
    - [参数列表](http://chrome.liuyixi.com/manifest.html)
 * 在清单文件中提供了代码文件
 * 插件完成后，将其导入到Chrome中
    - 首先将所有相关文件都放到一个文件夹中
    - 用Chrome打开chrome://settings/extensions 这个网址是Chrome的扩展程序管理页面。点击“加载正在开发的扩展程序”，选择刚才创建的文件夹，- 确定，即成功导入。如果导入出错会有提示信息显示，可能是json文件配置有问题等。
    
 * [文章])(https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

## 服务端
* [node](node/README.md)
* [linux](linux/readme.md)
* [nginx](nginx/readme.md)
* [docker](docker/readme.md)

* 数据爬虫
* [electron](cross-platform/electron/readme.md)
* [puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/)
* 抓包工具
   - charles mac
   - fiddler windows 侧重http协议
   - WireShark 所有的通讯协议

## 图与可视化
* [图与可视化](图与可视化/readme.md)

## 我的开源项目
- [vue:中后台前端模板](https://github.com/qinmao/vue-admin-template)
- [vue:移动端前端模板]()
- [vue:ssr 开发模板]()
- [electron:前端爬虫]()
- [puppeteer:无头浏览器爬虫]()
- [electron:跨平台客户端]()
- [node:koa2-api 模板](https://github.com/qinmao/node-api-template)
- [微信小程序:原生开发模板]()
- [微信小游戏:基于cocos-creator]()
- [G6 可视化流程图]()
- [pdf.js 文档标注平台]()

## 2019-2020
 - http协议

 - 浏览器

 - nodejs

 - mysql

 - 算法与数据结构
 
 - vue/ui框架
 
 - typescript

## tree 目录生成命令
 1. 安装 :brew install tree  ||  apt-get install tree
 2. exmple: tree -L 3 -I "node_modules"
    - tree -d 只显示文件夹；
    - tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
    - tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
    - tree > tree.md 将项目结构输出到tree.md这个文件。