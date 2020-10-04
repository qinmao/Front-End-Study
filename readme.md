# 前端
> 前端的知识网络庞杂，知识点琐碎，记住所有的细节不太可能，所以往往需要做些总结，记录最核心的知识点，构建自己的知识网络。
## css
* [css核心基础](css/css基础知识.md)
* [css3核心基础](css/css3.md)
* [less](css/less/less.md)
* [sass](css/sass/readme.md)

## h5
* [h5基础](html/html5/h5.md)
* [h5 mobile](mobile/h5-mobile.md)

## js基础
* [js基础](ECMA/js基础语法.md)
* [dom基础](浏览器/dom.md)
* [bom基础](浏览器/bom.md)
* [正则表达式](note/reg.md)

## js高级
* [面向对象](ECMA/面向对象.md)
* [es6对js的扩展](ECMA/es6.md)
* [常用的设计模式](desin-patterns/)

## 常用封装的函数
* [日期格式处理](js/date-format.js)
* [数字的格式处理](js/num-format.js)
* [数组的处理](js/array-util.js)
* [字符串的处理](js/string-util.js)

## (*)浏览器工作原理与http协议
* [工作原理与实践](浏览器/readme.md)
* [http协议](http/readme.md)

## 数据爬虫
* [electron](cross-platform/electron/readme.md)
* [puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/)
* 抓包工具
   - charles mac
   - fiddler windows 侧重http协议
   - WireShark 所有的通讯协议

## framework
* [vue](framework/vue/vue.md)
* [react](framework/react/readme.md)
* [jq](framework/jq/readme.md)
* [zepto](framework/zepto/readme.md)

## 移动端开发
* [h5](mobile/h5-mobile.md)

## 跨平台技术
* [Hybrid-App](/Hybrid-App/cordova.build.app.md)
* [微信小程序](wx/readme.md)
* react native
* [weex/uni-app](cross-platform/weex)
* flutter
* [electron](cross-platform/electron/readme.md)

## 前端优化
* [优化](前端优化/readme.md)

## 数据结构与算法
* c语言基础
* 数据结构与算法

## 服务端
* [node](node/README.md)
* [linux](linux/readme.md)
* [nginx](nginx/readme.md)
* [docker](docker/readme.md)
* [数据库mysql](数据库/mysql.md)

## 工程化
* 构建与打包工具
  - [gulp](build-tool/gulp/readme.md)
  - [webpack](build-tool/webpack/readme.md)

* 单元测试

* 运维监控

## 环境和工具
* mac 
  - 包管理 brew[官网](http://brew.sh/index_zh-cn.html)
  - 安装:
    ``` 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    ```
  + brew 用法
     - brew install 软件名  
     - brew uninstall  软件名称
     - brew list 可以查看所有安装的软件
     - brew info 软件名

* vscode 
   - file-size
   - html css support
   - minapp 
   - vetur
   - vscode-icons
   - vueHelper
   - [参考](https://juejin.im/post/5e89fb596fb9a03c75753eb0?utm_source=gold_browser_extension#comment)

* eslint
   - 是nodejs编写，提供一种代码编写规范。
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

* Fontmin/字蛛
* ImageOptim
* 文档工具
   - dash(mac)
   - zeal(windows)
    
* windows 连接服务器的工具
  - fileZillaClint 可视化ft工具
  - Xshell

* [git基本使用](git/readme.md)





## 图与可视化
* [图与可视化](图与可视化/readme.md)

## 我的开源项目
* [vue:中后台前端模板](https://github.com/qinmao/vue-admin-template)
* [vue:移动端前端模板]()
* [vue:ssr 开发模板]()
* [electron:前端爬虫]()
* [puppeteer:无头浏览器爬虫]()
* [electron:跨平台客户端]()
* [node:koa2-api 模板](https://github.com/qinmao/node-api-template)
* [微信小程序:原生开发模板]()
* [微信小游戏:基于cocos-creator]()
* [G6 可视化流程图]()
* [pdf.js 文档标注平台]()

## tree 目录生成命令
* 安装 :brew install tree  ||  apt-get install tree
* exmple: tree -L 3 -I "node_modules"
   - tree -d 只显示文件夹；
   - tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
   - tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
   - tree > tree.md 将项目结构输出到tree.md这个文件。