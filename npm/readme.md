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
