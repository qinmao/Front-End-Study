# node
## 总体上的感知
* Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
* Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
- Chrome V8 是 JavaScript 引擎
- Node.js 内置 Chrome V8 引擎，所以它使用的 JavaScript 语法
- JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
- 如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 I/O 很慢，不得不等着结果出来，再往下执行
- CPU 完全可以不管 I/O 设备，挂起处于等待中的任务，先运行排在后面的任务
将等待中的 I/O 任务放到 Event Loop 里
- 由 Event Loop 将 I/O 任务放到线程池里
- 只要有资源，就尽力执行
> Node.js (v12以前) 是单线程，就是因为在接受任务的时候是单线程的，它无需进程/线程切换上下文的成本，非常高效，但它在执行具体任务的时候是多线程的。
![node结构图](node结构.jpg)

## node 事件驱动模型
* 主线程：
    1. 执行node的代码，把代码放入队列
    2. 事件循环程序（主线程）把队列里面的同步代码都先执行了
    3. 同步代码执行完成，执行异步代码
    4. 异步代码分2种状况
        1. 异步非io setTimeout() setInterval() 判断是否可执行，如果可以执行就执行，不可以跳过。
        2. 异步io 文件操作会从线程池当中去取一条线程，帮助主线程去执行。
    5. 主线程会一直轮训，队列中没有代码了，主线程就会退出。

* 子线程：被放在线程池里面的线程，用来执行异步io操作
    1. 在线程池里休息
    2. 异步io的操作来了，执行异步io操作。
    3. 子线程会把异步io操作的callback函数，扔回给队列
    4. 子线程会回到线程池了去休息。callback，在异步io代码执行完成的时候被扔回主线程。

## 应用场景
> NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景
- RESTful API
这是NodeJS最理想的应用场景，可以处理数万条连接，本身没有太多的逻辑，只需要请求API，组织数据进行返回即可。它本质上只是从某个数据库中查找一些值并将它们组成一个响应。由于响应是少量文本，入站请求也是少量的文本，因此流量不高，一台机器甚至也可以处理最繁忙的公司的API需求。

- 统一Web应用的UI层
    做前后端的依赖分离。如果所有的关键业务逻辑都封装成REST调用，就意味着在上层只需要考虑如何用这些REST接口构建具体的应用。那些后端程序员们根本不操心具体数据是如何从一个页面传递到另一个页面的，他们也不用管用户数据更新是通过Ajax异步获取的还是通过刷新页面。

- 大量Ajax请求的应用

## 优缺点
 * 优点:
    - 高并发
    - 适合I/O密集型应用

 * 缺点:
    - 不适合CPU 密集型应用，老版本由于JavaScript单线程的原因(新版本支持多线程)，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；
    + 解决：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起；
        - 开源组件库质量参差不齐，更新快，向下不兼容
        - 写法上恶心的回调，终极解决方案：Async/Await

## install
* node 安装完成后 npm 默认安装，推荐安装nvm 来切换node 版本
* windows 安装node 推荐使用nvm-windows [详情参考](https://github.com/coreybutler/nvm-windows)

## 执行node
* 相对路径
    - ./当前路径
    - ../上级目录

* node + 文件路径的形式执行
    + supervisor
        - 每次修改代码保存后，我们都需要手动重启程序,使用 supervisor 可以解决这个繁琐的问题
        - npm install -g supervisor
        - 运行supervisor --harmony index启动程序
        - supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

    + 在package.json中设置scripts
        ```
        "scripts": {
            "start": "node ./bin/www"
        }
        ```



## 模块
* 核心模块
    - http：提供HTTP服务器功能。
    - url：解析URL。
    - fs：与文件系统交互。
    - querystring：解析URL的查询字符串。
    - child_process：新建子进程。
    - util：提供一系列实用小工具。
    - path：处理文件路径。
    - crypto：提供加密和解密功能，基本上是对OpenSSL的包装。

* 特殊的模块
    - global 有且仅有一个全局对象
    - process 代表当前的nodejs 进程
    - 想要在下一次事件响应中执行代码，可以调用process.nextTick()
    ```js
        // process.nextTick()将在下一轮事件循环中调用:
        process.nextTick(function () {
            console.log('nextTick callback!');
        });
        console.log('nextTick was set!');

        // nextTick was set!
        // nextTick callback!
    ```
    - Node.js进程本身的事件就由process对象来处理。
    ```js
        // 程序即将退出时的回调函数:
        process.on('exit', function (code) {
            console.log('about to exit with code: ' + code);
        });
    ```

## web framework
- express
- [koa](http://www.ruanyifeng.com/blog/2017/08/koa.html)
- egg

## 脚手架
- koa-generator 非官方，狼叔开发的
    ```
    npm install koa-generator -g
    koa2 projectName
    ```

## web 模板引擎
+ Nunjucks 是Mozilla开发的一个纯JavaScript编写的模板引擎，既可以用在Node环境下（主要），又可以运行在浏览器端（有更好的mvvm框架）

## mysql
* centos7 安装mysql(8.0.18)（使用yum安装）
    + 配置 mysql 的 yum 源
        - 在mysql 官网找到对应的源 https://dev.mysql.com/downloads/repo/yum/
        - 下载 yum 源
        ```
        wget 'https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm' 
        ```
        - 安装yum 源 
        ```
        rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
        ```
        - 查看有哪些版本的mysql
        ```
        yum repolist all | grep mysql
        ```
    + 安装启动
        - 检查是否有老版本,有干掉
        ```
        yum list installed | grep mysql
        yum -y remove xxx
        ```
        - 安装： 
        ```
        yum install -y mysql-community-server
        ```
        - 启动：
        ```
        systemctl start mysqld
        systemctl restart mysqld
        systemctl stop mysqld
        ```
        - 查看状态
        ```
        systemctl status mysqld
        ```
        - 设置开机自启动
        ```
        systemctl enable mysqld
        systemctl daemon-reload
        ```
    + 设置登录
        - 找到首次生成的密码
        ```
        grep 'temporary password' /var/log/mysqld.log
        ```
        - 执行命令，输入上一步生成的密码
        ```
        mysql -uroot -p 
        ```
        - 修改密码,成功后，mysql -uroot -p 后加密码 mysql命令要加分号，“;”
        ```
         ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxxx';
        ```
        - 设置远程登录:
        1. 开放云服务器3306端口
        2. 配置可远程访问
        ```
        # 修改host为%,并刷新权限
        use mysql;
        select host, user, authentication_string, plugin from user
        GRANT ALL ON *.* TO 'root'@'%';
        flush privileges;
        # 查看是否修改好
        use mysql;
        select host, user, authentication_string, plugin from user
        
        # 修改密码的加密方式
        ALTER USER 'root'@'%' IDENTIFIED BY 'yourpassword' PASSWORD EXPIRE NEVER; 
        ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
        flush privileges;
        ```
    + 修改配置 
        - vim /etc/my.cnf
        - 修改字符集: character-set-server=utf8
        - 设置时区为东八区:default-time_zone = '+8:00'
        - 重启数据库：systemctl restart mysqld
        
* [mysql](https://github.com/mysqljs/mysql#escaping-query-values) 

* [orm(Sequelize)](https://sequelize.org/)


## mongoDB
- 安装驱动 npm install mongodb
- [curd](node-mongoDB/index.js)

## redis

## RESTful API
- 什么是 REST？
        REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
        REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON作为数据传递的格式。
    
        REST 基本架构的四个方法：GET,PUT 更新或添加数据，DELETE 删除数据,POST 添加数据
- RESTful 又是什么？
    简单的说 就是基于REST 架构的 Web Services 即是 RESTful

## 日志

## 监控

## 接口文档

## 部署
- [pm2](pm2/readme.md)


#### 学习的计划
- 整体上了解 nodejs
- 框架：koa express egg
- 实战：
- 部署：
