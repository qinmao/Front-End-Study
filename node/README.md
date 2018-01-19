# node-study
    node base use
##  安装注意问题
    node 安装完成后
    由于网络问题导致下载包会出问题，安装nrm来选择资源
    npm install -g nrm
    nrm test 选择网络延迟最少的
    nvm 来切换node 版本
## npm 
    npm init  创建package.json文件
    npm install  将package.json中的文件依赖的包从网上下载到本地
    npm shrinkwrap 保证任何机器上安装的都是同样版本的模块（不管嵌套多少层）,存在则优先将npm-shrinkwrap.json 文件依赖的包进行安装，没有则package.json
    npm install  包名 -save 将包下载下来并且加载到dependencies中去
    npm install  包名 -save-dev  将包下载下来并且加载到devDependencies中去
    npm install  包名 -g  全局安装
    npm docs 包名 查看包的文档

    现在推荐使用yarn 

    语义化版本号
        1.2.3
        1表示重大更新
        2表示向下兼容
        3表示补丁包更新
    
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

    package.json 所有的字段
    参考 http://www.mujiang.info/translation/npmjs/files/package.json.html
## windows 安装node 推荐使用nvm-windows
    详情参考  https://github.com/coreybutler/nvm-windows
## node ？
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
## Node.js的核心模块
    1. http：提供HTTP服务器功能。
    2. url：解析URL。
    3. fs：与文件系统交互。
    4. querystring：解析URL的查询字符串。
    5. child_process：新建子进程。
    6. util：提供一系列实用小工具。
    7. path：处理文件路径。
    8. crypto：提供加密和解密功能，基本上是对OpenSSL的包装。
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





