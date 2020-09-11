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
* [正则表达式](note/reg.md)

## (*)浏览器工作原理与http协议
* [工作原理与实践](浏览器/readme.md)
* [http协议](http/readme.md)

## js 高级
* [面向对象](ECMA/面向对象.md)
* [es6对js的扩展](ECMA/es6.md)
* [常用的设计模式](desin-patterns/)

## 常用封装的函数
* [日期格式处理](js/date-format.js)
* [数字的格式处理](js/num-format.js)
* [数组的处理](js/array-util.js)
* [字符串的处理](js/string-util.js)

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
* 数据驱动式
  - [angular1](framework/angular1/angular-base.html)
  - [angular2](framework/angular2/angular.md)
  - [vue](framework/vue/vue.md)
  - [react](framework/react/readme.md)

* 手动式
  - [jq](framework/jq/readme.md)
  - [zepto](framework/zepto/readme.md)

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
* [优化](前端优化/readme.md)

## 工程化
* 构建与打包工具
  - [gulp](build-tool/gulp/readme.md)
  - [webpack](build-tool/webpack/readme.md)

* 测试

* 监控

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

## 服务端
* [node](node/README.md)
* [linux](linux/readme.md)
* [nginx](nginx/readme.md)
* [docker](docker/readme.md)

## 数据爬虫
* [electron](cross-platform/electron/readme.md)
* [puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/)
* 抓包工具
   - charles mac
   - fiddler windows 侧重http协议
   - WireShark 所有的通讯协议

## 图与可视化
* [图与可视化](图与可视化/readme.md)

## chrome插件的开发
* 首先要有一个manifest.json清单文件
   - [参数列表](http://chrome.liuyixi.com/manifest.html)
* 在清单文件中提供了代码文件
* 插件完成后，将其导入到Chrome中
   - 首先将所有相关文件都放到一个文件夹中
   - 用Chrome打开chrome://settings/extensions 这个网址是Chrome的扩展程序管理页面。点击“加载正在开发的扩展程序”，选择刚才创建的文件夹，- 确定，即成功导入。如果导入出错会有提示信息显示，可能是json文件配置有问题等。
   
* [文章])(https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

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