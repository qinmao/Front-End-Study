## npm nrm nvm 
 > 由于网络问题导致下载包会出问题，安装nrm来选择资源

 * nrm 更改源
    1. 使用nrm 来test 选择最好的源
        ```
        npm install  nrm -g
        nrm test 选择网络延迟最少的
        nrm use cnpm  //switch registry to cnpm
        nrm ls 查看所有
        nrm add 命令添加公司私有npm源
        例子：nrm add qihoo http://registry.npm.360.org
        ```
    2. 手动更改源
        ```
        npm config set registry https://registry.npm.taobao.org
        npm config set registry http://r.cnpmjs.org
        科学上网后或者发布时移掉
        npm config rm registry
        ```

 * nvm 版本控制

 * npm
    + install
    - npm install  将package.json中的文件依赖的包从网上下载到本地
    - npm shrinkwrap 保证任何机器上安装的都是同样版本的模块（不管嵌套多少层）,存在则优先将- npm-shrinkwrap.json 文件依赖的包进行安装，没有则package.json
    - npm install  包名 -save 将包下载下来并且加载到dependencies中去
    - npm install  包名 -save-dev  将包下载下来并且加载到devDependencies中去
    - npm install  包名 -g  全局安装

    + update
    - npm update -g <package>  跟新全局包
    - npm outdated -g --depth=0 要找出哪些全局包需要更新
    - npm update -g 更新所有的全局包
    
    + npm docs 包名 查看包的文档

    + uninstall
    - npm uninstall  <package> 加-D 或-S 移除依赖
    - npm uninstall -g <package>

    + npm <command> -h  quick help on <command>
    
* npx
    + npm5.2以上自带
    + 应用场景
        - 调用项目内安装的模块
        ```
        # 项目的根目录下执行
        $ node-modules/.bin/mocha --version

        # npx 更方便
        npx mocha --version

        # 就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在

        ```
        - 使用不同版本的 node
        ```
        # 利用 npx 可以下载模块这个特点，可以指定某个版本的 Node 运行脚本。它的窍门就是使用 npm 的 node 模块。
        $ npx node@0.12.8 -v
        v0.12.8

        ```

## package.json
 - npm init  创建package.json文件
 - npm init --yes 获得默认值
 - npm 启动 node 
    ```
    "scripts": {
        "start": "node ./bin/www",
        "test": "node ./bin/test",
        "qm":"node ./bin/test"
    },

    默认 npm start
    可以占用npm 中的命令 npm test
    可以自定义 npm run qm 
    ```
 - package.json 所有的字段 
 - [参考](http://www.mujiang.info/translation/npmjs/files/package.json.html)

## 语义化版本号
+ 1.2.3
    - 1表示重大更新
    - 2表示向下兼容
    - 3表示补丁包更新
        
+ 依赖
    - dependencies：这些软件包是您的应用程序在生产中所需的。
    - devDependencies：这些软件包仅用于开发和测试。

+ 版本号
    - ">" +版本号   下载大于某个版本号，npm会下最新版
    - "<" +版本号   下载小于某个版本号，npm会下小于这个版本号最新版
    - "<=" 小于等于 一定会下你写的这个版本，除非没有你写的这个版本
    - ">=" 大于等于  下载最新版
    - " *、' '、X "  任意 npm会给你下最新版
    - "^" +版本号  不跃迁版本下载，^2.1.0 npm会下载大版本不变，去下载2.x.x版本里的最近版
    - "~" +版本号  会去下约等于这个版本的最新版，在大版本不变的情况下下一个比较新的版本

## 创建Node包,发布、更新
+ 创建
    - package.json文件被创建后，创建一个当你的模块被需要的时候加载的文件。该文件的默认名称是index.js。在该文件中，添加一个函数作为exports对象的一个属性。这将使该功能可用于其他代码。

    ```js
        exports.printMsg = function() {
            console.log("This is a message from the demo package");
        }
    ```
+ 发布和更新
    - tip:发布时切回原始的源（从淘宝等镜像源切回npm）
    - 注意： npm对包名的限制：不能有大写字母/空格/下滑线!
    - 你的项目里有部分私密的代码不想发布到npm上？将它写入.gitignore 或.npmignore中，上传就会被忽略了
    - 第一次发布包：在终端输入npm adduser，输入账号。npm adduser成功的时候默认你已经登陆了。
    - 非第一次发布包：在终端输入npm login，然后输入你创建的账号和密码，和邮箱
    - npm publish 发布和更新
    - npm view 查看是否发布成功

    - 通过npm version <update_type>自动改变版本（或者手动更改package.json）
    - update_type为patch, minor, or major其中之一，分别表示补丁，小改，大改

+ 撤销发布的包
    - npm --force unpublish 你的模块名，来删除发布的模块（超过24小时就不能删除了）
    - npm unpublish的推荐替代命令：npm deprecate <pkg>[@<version>] <message>
    - 使用这个命令，并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告
    - 例如：npm deprecate penghuwanapp '这个包我已经不再维护了哟～'

+ 发布遇到的问题
    1. npm ERR! no_perms Private mode enable, only admin can publish this module:
        - 这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。
        - npm config set registry=http://registry.npmjs.org（推荐使用nrm来切换源）

    2. npm ERR! you do not have permission to publish "your module name". Are you logged in as the correct user?
        - 提示没有权限，其实就是你的module名在npm上已经被占用啦，
        - 去npm搜索你的模块名称，搜不到，就能用，并且把 package.json里的name修改过来，重新npm publish

## 安装三方包遇到的问题和解决方案
- 对于一些下载慢或者需要翻墙的包可以先不安装
- 其他包安装完，可以单独指定淘宝源安装如：node-sass
 ```
 npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass
 
 ```