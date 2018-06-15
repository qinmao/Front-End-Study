# node-study
    node base use
##  安装注意问题
    node 安装完成后 npm 默认安装
    推荐安装nvm 来切换node 版本
## windows 安装node 推荐使用nvm-windows
    详情参考  https://github.com/coreybutler/nvm-windows
## npm
    由于网络问题导致下载包会出问题，安装nrm来选择资源
    npm install -g nrm
    nrm test 选择网络延迟最少的
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
## module.exports 
    1. module.exports是全局的对象 可简写成exports
        node 帮我们实现了var exports=module.exports
        exports 就是module.exports 的别名
        初始值是空对象
    2. 通过模块间传递module.exports对象，来打破封装性
## webpack 1.0 import/require  export/module.exports
           2.0  成双成对 （第三方）    
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
       1) install:
        Cli:npm install -g express-generator@4
        Usage: express [options] [dir]
       自动生成项目
       2) 中间件(核心)
        内置中间件:
        第三方中间件:
        功能：
            错误处理
            应用级
            路由级
        3) 参数获取
            1. req.params 
            //用get请求传输过来的参数
            app.get('/user/:id', function(req, res){
            res.send('user ' + req.params.id);
            });
            注意点：取带冒号的参数
            2. req.body
                依赖bodyParser
                获取post 参数
            3. req.query
                1. // GET /search?q=tobi+ferret
                    req.query.q
                    // => "tobi ferret"

                2. // GET /shoes?order=desc&shoe[color]=blue&shoe[type] =converse
                    req.query.order
                    // => "desc"

                    req.query.shoe.color
                    // => "blue"

                    req.query.shoe.type
                    // => "converse"

                3. 变态的写法
                    // POST /search?q=tobi+ferret 
                    req.query.q
                    // => "tobi ferret"
    2. koa
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
## node 应用场景
    NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景
    1. RESTful API
    这是NodeJS最理想的应用场景，可以处理数万条连接，本身没有太多的逻辑，只需要请求API，组织数据进行返回即可。它本质上只是从某个数据库中查找一些值并将它们组成一个响应。由于响应是少量文本，入站请求也是少量的文本，因此流量不高，一台机器甚至也可以处理最繁忙的公司的API需求。
    2. 统一Web应用的UI层
    做前后端的依赖分离。如果所有的关键业务逻辑都封装成REST调用，就意味着在上层只需要考虑如何用这些REST接口构建具体的应用。那些后端程序员们根本不操心具体数据是如何从一个页面传递到另一个页面的，他们也不用管用户数据更新是通过Ajax异步获取的还是通过刷新页面。
    3. 大量Ajax请求的应用





