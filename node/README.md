# node-study
## 安装注意问题
    node 安装完成后 npm 默认安装
    推荐安装nvm 来切换node 版本
## windows 安装node 推荐使用nvm-windows
    详情参考  https://github.com/coreybutler/nvm-windows
## npm nrm nvm 
    由于网络问题导致下载包会出问题，安装nrm来选择资源
    1. 使用nrm 来test 选择最好的源
        npm install  nrm -g
        nrm test 选择网络延迟最少的
        nrm use cnpm  //switch registry to cnpm
        nrm ls 查看所有
        nrm add 命令添加公司私有npm源
        例子：nrm add qihoo http://registry.npm.360.org
        
    2. 手动更改源
    1）npm config set registry https://registry.npm.taobao.org
    2）npm config set registry http://r.cnpmjs.org

    科学上网后或者发布时移掉
    npm config rm registry
    
### 1.初始化package.json文件
    npm init  创建package.json文件
    npm init --yes 获得默认值
    package.json 所有的字段
    参考 http://www.mujiang.info/translation/npmjs/files/package.json.html
### 2.包管理
    npm install  将package.json中的文件依赖的包从网上下载到本地
    npm shrinkwrap 保证任何机器上安装的都是同样版本的模块（不管嵌套多少层）,存在则优先将npm-shrinkwrap.json 文件依赖的包进行安装，没有则package.json
    npm install  包名 -save 将包下载下来并且加载到dependencies中去
    npm install  包名 -save-dev  将包下载下来并且加载到devDependencies中去
    npm install  包名 -g  全局安装
    npm update -g <package>  跟新全局包

    // 要找出哪些包需要更新
    npm outdated -g --depth=0
    npm update -g 更新所有的全局包
    npm docs 包名 查看包的文档

    // 卸载
    npm uninstall  <package> 加-D 或-S 移除依赖
    npm uninstall -g <package>
### 3.语义化版本号
        1.2.3
        1表示重大更新
        2表示向下兼容
        3表示补丁包更新
        
    "dependencies"：这些软件包是您的应用程序在生产中所需的。
    "devDependencies"：这些软件包仅用于开发和测试。

    dependencies 
    -  包名：“版本号” 
    -  > +版本号   下载大于某个版本号，npm会下最新版
    -  < +版本号   下载小于某个版本号，npm会下小于这个版本号最新版
    -  <= 小于等于 一定会下你写的这个版本，除非没有你写的这个版本
    -  >= 大于等于  下载最新版
    -   *、" "、X  任意 npm会给你下最新版
    -   ^ +版本号  不跃迁版本下载，^2.1.0 npm会下载大版本不变，去下载2.x.x版本里的最近版
    -   ~ +版本号  会去下约等于这个版本的最新版，在大版本不变的情况下下一个比较新的版本

    npm 启动 node 
    "scripts": {
    "start": "node ./bin/www",
    "test": "node ./bin/test",
    "qm":"node ./bin/test"
    },
    默认 npm start
    可以占用npm 中的命令 npm test
    可以自定义 npm run qm 
### 创建Node.js模块包
    package.json文件被创建后，创建一个当你的模块被需要的时候加载的文件。
    该文件的默认名称是index.js。
    在该文件中，添加一个函数作为exports对象的一个属性。这将使该功能可用于其他代码。
    ```javascript
    exports.printMsg = function() {
    console.log("This is a message from the demo package");
    }
    ```
### 发布和更新
发布时切回原始的源（从淘宝等镜像源切回来）
1. 注意： npm对包名的限制：不能有大写字母/空格/下滑线!
2. 你的项目里有部分私密的代码不想发布到npm上？将它写入.gitignore 或.npmignore中，上传就会被忽略了
3. 第一次发布包：在终端输入npm adduser，输入账号。npm adduser成功的时候默认你已经登陆了。
4. 非第一次发布包：在终端输入npm login，然后输入你创建的账号和密码，和邮箱

npm publish 发布和更新
npm view 查看是否发布成功

通过npm version <update_type>自动改变版本（或者手动更改package.json）
update_type为patch, minor, or major其中之一，分别表示补丁，小改，大改
### 撤销发布的包
npm --force unpublish 你的模块名，来删除发布的模块（超过24小时就不能删除了）
npm unpublish的推荐替代命令：npm deprecate <pkg>[@<version>] <message>
使用这个命令，并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告
例如：npm deprecate penghuwanapp '这个包我已经不再维护了哟～'
### 发布遇到的问题
1. npm ERR! no_perms Private mode enable, only admin can publish this module:
这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。
npm config set registry=http://registry.npmjs.org（推荐使用nrm来切换源）
2. npm ERR! you do not have permission to publish "your module name". Are you logged in as the correct user?
提示没有权限，其实就是你的module名在npm上已经被占用啦，这时候你就去需要去npm搜索你的模块名称，如果搜索不到，就可以用，并且把package.json里的name修改过来，重新npm publish
### 持续集成
    持续集成：Continuous Integration，简称CI，意思是，在一个项目中，任何人对代码库的任何改动，都会触发CI服务器自动对项目进行构建，自动运行测试，甚至自动部署到测试环境。这样做的好处就是，随时发现问题，随时修复。因为修复问题的成本随着时间的推移而增长，越早发现，修复成本越低。

    如何为GitHub上托管的开源项目用Travis CI进行持续集成?  

    1. Travis CI是什么东东？
    Travis CI是在线托管的CI服务，用Travis来进行持续集成，不需要自己搭服务器，在网页上点几下就好，用起来更方便。最重要的是，它对开源项目是免费的。

    2. 为什么是GitHub？
    因为GitHub和Travis是一对好基友，不用GitHub虽然也能用Travis，但是配置起来太麻烦。而且，作为开源项目，为什么不用GitHub？
    3. 怎么撸？
    首先，直接用你的GitHub账号登录Travis CI的网站：https://travis-ci.org/
    第一次登录时，授权给Travis访问你的GitHub代码库，然后，把需要CI的代码库选上：

    参考:https://www.liaoxuefeng.com/article/0014631488240837e3633d3d180476cb684ba7c10fda6f6000

    ```javascript
    // 1. 最简单的例子是让travis在node.js的0.6.x，0.6.1，0.5.11三个版本下对项目进行测试
    language: node_js
    node_js:
    - "6"
    - "6.1"
    - "5.11"
    // 2. Travis 构建过程主要分为两步：
    // install：安装依赖，在 node 环境下，默认运行 npm install
    // stript：运行构建命令，在 node 环境下，默认运行 npm test
        language: node_js
        node_js:
        - "6"
        install: npm install
        script: npm test
    成功之后会在Travis官网上出现build 成功失败的图标，可以把copy在readme.md 文件中

    // 详细文档：https://docs.travis-ci.com/
    // 后续的功能持续研究中...

    ```
## node
    1. Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
    2. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
## 执行
    相对路径
    ./当前路径
    ../上级目录
    1. node +文件路径的形式执行

    2. 每次修改代码保存后，我们都需要手动重启程序
        使用 supervisor 可以解决这个繁琐的
        npm install -g supervisor
        运行supervisor --harmony index启动程序
        supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

    3. 在package.json中设置scripts
        "scripts": {
            "start": "node ./bin/www"
        }
       在这包的目录中打npm start命令
## 模块（module）的概念
历史:
 ES6 之前，js没有module，不利于大程序的开发，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
 * commonjs:使用js语法要求的后端语言的规范,模块化、后端语言需要具备的一些要求，可以http、操作文件。。。。
     - require/module.exports
 * 与此同时 nodejs开启了js全栈大门，而requirejs在国外也带动着前端逐步实现模块化
     - 同时国内seajs也进行了大力推广
     - AMD 异步模块定义 requirejs
     - CMD seajs和nodejs非常相似
        + commonjs包含模块定义，和CMD比较相似
es6 发布之后提供了通用的模块解决方案。
1. 使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
2. CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
```javascript
    // CommonJS模块
    let { stat, exists, readFile } = require('fs');
    // 等同于
    let _fs = require('fs');
    let stat = _fs.stat;
    let exists = _fs.exists;
    let readfile = _fs.readfile;

    // 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

    // ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
    // ES6模块
    import { stat, exists, readFile } from 'fs';

    // 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
```
3. es6 模块的语法:
    ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
    模块功能主要由两个命令构成：export 和 import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
    es6 模块写法:
    ```javascript
        // 1. profile.js
        var firstName = 'Michael';
        var lastName = 'Jackson';
        var year = 1958;
        export {firstName, lastName, year};
        // 使用大括号指定所要输出的一组变量(推荐写法)
        // 等价于
        // profile.js
        export var firstName = 'Michael';
        export var lastName = 'Jackson';
        export var year = 1958;

        // 2. export命令除了输出变量，还可以输出函数或类（class）。
        function v1() { ... }
        function v2() { ... }
        export {
            v1 as streamV1,
            v2 as streamV2,
            v2 as streamLatestVersion
        };
        // as关键字可重命名
    ```
    * import 注意事项
    - 1. 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
    - 2. import命令具有提升效果，会提升到整个模块的头部，首先执行。
    ```javascript
        foo();
        import { foo } from 'my_module';
        // 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前
    ```
    - 3. 错误的写法
    ```javascript
        // 报错
        export 1;
        // 报错
        var m = 1;
        export m;

        正确写法：
        // 写法一
        export var m = 1;
        // 写法二
        var m = 1;
        export {m};
        // 写法三
        var n = 1;
        export {n as m};

        同样的，function和class的输出，也必须遵守这样的写法。
    ```
    - 4. import 语句会执行所加载的模块
    ```javascript
    import 'lodash';
    // 代码仅仅执行lodash模块，但是不输入任何值。
    ```
    - 5. Singleton 模式
    ```javascript
        import { foo } from 'my_module';
        import { bar } from 'my_module';
        // 等同于
        import { foo, bar } from 'my_module';
        // 虽然 foo 和 bar 在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式。
    ```
    * export 注意事项 
    - export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，
    - import命令也是如此。
    * 模块的整体加载  
    ```javascript
        // circle.js
        export function area(radius) {
            return Math.PI * radius * radius;
        }
        export function circumference(radius) {
            return 2 * Math.PI * radius;
        }
        // main.js 中 整体加载的写法如下
        import * as circle from './circle';
        console.log('圆面积：' + circle.area(4));
        console.log('圆周长：' + circle.circumference(14));
        // circle 应该是可以静态分析的，所以不允许运行时改变
    ```
    *  默认导出方式：给用户提供方便,不需要知道所要加载的变量名或函数名
        export default xxx; 
        // 命令只能使用一次,所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。
        // 本质上，export default就是输出一个叫做default的变量或方法,系统允许你为它取任意名字
        import xxx from './xxx.js';// xxx 可以任意名称
    * import()函数 
    * 目的：为了解决在运行时无法加载模块以下是具体的应用场景
    - 1.按需加载
    ```javascript
    button.addEventListener('click', event => {
        import('./dialogBox.js')
        .then(dialogBox => {
            dialogBox.open();
        })
        .catch(error => {
            /* Error handling */
        })
        });
        // import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
    ```
    - 2.条件加载
    ```javascript
        if (condition) {
            import('moduleA').then(...);
            } else {
            import('moduleB').then(...);
        }
    ```
    - 3. 动态的模块路径
    ```javascript
        import(f())
        .then(...);
        // 根据函数f的返回结果，加载不同的模块。
    ```
    * 注意:import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。可以使用对象解构赋值的语法，获取输出接口。
    ```javascript
        // 1. export1和export2都是 myModule.js的输出接口，可以解构获得
        import('./myModule.js')
            .then(({export1, export2}) => {
            // ...·
            });
        // 2. default输出接口，可以用参数直接获得
        import('./myModule.js')
            .then(myModule => {
            console.log(myModule.default);
            });

        import('./myModule.js')
            .then(({default: theDefault}) => {
            console.log(theDefault);
            });
            // 可以使用具名输入的形式
        // 3. 同时加载多个模块
            Promise.all([
                import('./module1.js'),
                import('./module2.js'),
                import('./module3.js'),
            ])
            .then(([module1, module2, module3]) => {
            ···
            });
        // 4. 使用 async 函数
            async function main() {
                const myModule = await import('./myModule.js');
                const {export1, export2} = await import('./myModule.js');
                const [module1, module2, module3] =
                    await Promise.all([
                        import('./module1.js'),
                        import('./module2.js'),
                        import('./module3.js'),
                    ]);
            }
            main();
    ```

4. Module 的加载实现
    - 1. 默认情况下，浏览器是同步加载js脚本,为了解决脚本过大导致卡死的问题，所以脚本引入了异步加载
        <script src="path/to/myModule.js" defer></script>
        <script src="path/to/myModule.js" async></script>
    defer与async的区别是：一句话，defer是“渲染完再执行”，async是“下载完就执行”
    es6 module 的加载规则：
    <script type="module" src="./foo.js"></script>
    浏览器对于带有type="module"的<script>，都是异步加载，等同于defer
    - 2. ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
    <script type="module">
        import utils from "./utils.js";
        // other code
    </script>
    -3. ES6 模块与 CommonJS 模块的差异
        - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
        - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

    -4 node 加载:
        module.exports是全局的对象 可简写成exports node 帮我们实现了var exports=module.exports
        exports 就是 module.exports 的别名，初始值是空对象
## 进程和线程
    1. 进程：
        每一个正在运行的应用程序都被称之为进程
        每一个应用程序都至少有一个进程
        进程是用来给应用程序体用一个执行的环境
        给应用程序分配资源的一个单位

    2. 线程：
        用来执行应用程序中的代码
        在一个进程内部，有很多的线程
## node 事件驱动模型
    主线程：
        1. 执行node的代码，把代码放入队列
        2. 事件循环程序（主线程）把队列里面的同步代码都先执行了
        3. 同步代码执行完成，执行异步代码
        4. 异步代码非2种状况
            1. 异步非io setTimeout() setInterval()
                判断是否可执行，如果可以执行就执行，不可以跳过。
            2. 异步io 文件操作
                会从线程池当中去取一条线程，帮助主线程去执行。
        5. 主线程会一直轮训，队列中没有代码了，主线程就会退出。

    子线程：被放在线程池里面的线程，用来执行异步io操作
        1. 在线程池里休息
        2. 异步io的操作来了，执行异步io操作。
        3. 子线程会把异步io操作的callback函数，扔回给队列
        4. 子线程会回到线程池了去休息。
        callback
        在异步io代码执行完成的时候被扔回主线程。
## Node.js的核心模块
    1. http：提供HTTP服务器功能。
    2. url：解析URL。
    3. fs：与文件系统交互。
    4. querystring：解析URL的查询字符串。
    5. child_process：新建子进程。
    6. util：提供一系列实用小工具。
    7. path：处理文件路径。
    8. crypto：提供加密和解密功能，基本上是对OpenSSL的包装。
## 网络协议
     OSI（开放系统互联(Open System Interconnection)）模型中，把网络通信的工作分为了7层，它们分别是：
        HTTP、SMTP、IMAP等 应用层
        加密/解密等 表示层
        通信连接/维持会话 会话层
        TCP/UDP 传输层
        IP 网络层
        网络特有的链路接口 链路层
        网络物理硬件 物理层
        也有人将网络通信的工作分为了5层，便于我们的理解。

        应用层（Application Layer） http
        传输层（Transport Layer） tcp协议
        网络层（Network Layer） ip协议
        链路层（Link Layer） 局域网
        实体层（Physical Layer） 双绞线、光缆
## node framework
    1. express
    2. koa
    http://www.ruanyifeng.com/blog/2017/08/koa.html
    3. egg
## Node.js RESTful API
    1. 什么是 REST？
        REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
        REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON作为数据传递的格式。
    
        REST 基本架构的四个方法：GET,PUT 更新或添加数据，DELETE 删除数据,POST 添加数据
    2.  RESTful 又是什么？
        简单的说 就是基于REST 架构的 Web Services 即是 RESTful
## node.js mysql
    1. 安装驱动
        npm install mysql
    2. curd ..  Front-End-Study/node/node-mysql  
    3. node orm 
## node.js mongoDB
    1. 安装驱动
       npm install mongodb
    2. curd ..  Front-End-Study/node/node-mongoDB
## node.js redis
## node orm
## 优缺点
    优点:
        1. 高并发
        2. 适合I/O密集型应用
    缺点:
        1. 不适合CPU 密集型应用，由于JavaScript单线程的原因，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；  
        解决：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起；
        2. 只支持单核CPU，不能充分利用CPU
        3. 可靠性低：单进程，单线程
        4. 开源组件库质量参差不齐，更新快，向下不兼容
        5. 写法上恶心的回调，终极解决方案：Async/Await
## node 应用场景
    NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景
    1. RESTful API
    这是NodeJS最理想的应用场景，可以处理数万条连接，本身没有太多的逻辑，只需要请求API，组织数据进行返回即可。它本质上只是从某个数据库中查找一些值并将它们组成一个响应。由于响应是少量文本，入站请求也是少量的文本，因此流量不高，一台机器甚至也可以处理最繁忙的公司的API需求。
    2. 统一Web应用的UI层
    做前后端的依赖分离。如果所有的关键业务逻辑都封装成REST调用，就意味着在上层只需要考虑如何用这些REST接口构建具体的应用。那些后端程序员们根本不操心具体数据是如何从一个页面传递到另一个页面的，他们也不用管用户数据更新是通过Ajax异步获取的还是通过刷新页面。
    3. 大量Ajax请求的应用
## docker+jenkins 自动化部署
前置知识:
1. Linux
2. Docker:
## 安装
    npm install pm2 -g 
## pm2部署的优点:
1. 使用pm2管理的node程序的好处
2. 监听文件变化，自动重启程序
3. 支持性能监控
4. 负载均衡
5. 程序崩溃自动重启
6. 服务器重新启动时自动重新启动
7. 自动化部署项目
## 常用命令：
1. 启动一个node程序
pm2 start start.js
2. 启动进程并指定应用的程序名
pm2 start app.js --name application
3. 添加进程监视（在文件改变的时候会重新启动程序）
pm2 start app.js --name start --watch
4. 进程管理
pm2 ls 
// pm2 delete [appname] | id
pm2 delete app  // 指定进程名删除
pm2 delete 0    // 指定进程id删除
pm2 delete all

pm2 describe app 查看某个进程具体情况
pm2 monit 查看进程的资源消耗情况

pm2 restart app // 重启指定名称的进程
pm2 restart all // 重启所有进程

pm2 logs app    // 查看该名称进程的日志
pm2 logs all    // 查看所有进程的日志


pm2 startup centos 设置pm2开机自启
pm2 save 保存设置