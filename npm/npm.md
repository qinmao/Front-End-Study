## npm
* npm 配置
  + 修改下载源
    - 使用nrm工具管理源
        ```
        npm install  nrm -g
        nrm test 选择网络延迟最少的
        nrm use cnpm  //switch registry to cnpm
        nrm ls 查看所有
        nrm add 命令添加公司私有npm源
        例子：nrm add qihoo http://registry.npm.360.org
        ```
    - npm config
        ```
        npm config set registry https://registry.npm.taobao.org
        npm config set registry http://r.cnpmjs.org
        // 科学上网后或者发布时移掉
        npm config rm registry
        ```
    - 项目中配置.npmrc并添加一下内容 
        ```
        registry=http://私有仓库xxx.com
        disturl=https://npm.taobao.org/dist
        chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver
        operadriver_cdnurl=http://npm.taobao.org/mirrors/operadriver
        phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
        fse_binary_host_mirror=https://npm.taobao.org/mirrors/fsevents
        sass_binary_site=http://npm.taobao.org/mirrors/node-sass
        electron_mirror=http://npm.taobao.org/mirrors/electron/
        
        // .yarnrc文件并添加一下内容（二选一）
        registry "http://atour-fe-lib.corp.yaduo.com"
        chromedriver_cdnurl "http://npm.taobao.org/mirrors/chromedriver"
        disturl "https://npm.taobao.org/dist"
        electron_mirror "http://npm.taobao.org/mirrors/electron/"
        fse_binary_host_mirror "https://npm.taobao.org/mirrors/fsevents"
        lastUpdateCheck 1589360140304
        operadriver_cdnurl "http://npm.taobao.org/mirrors/operadriver"
        phantomjs_cdnurl "http://npm.taobao.org/mirrors/phantomjs"
        sass_binary_site "http://npm.taobao.org/mirrors/node-sass"

        ```

* npm 基础用法
    + install
        - npm install  将package.json中的文件依赖的包从网上下载到本地
        - npm shrinkwrap 保证任何机器上安装的都是同样版本的模块（不管嵌套多少层）,存在则优先将- npm-shrinkwrap.json 文件依赖的包进行安装，没有则package.json
        - npm install  包名 -save 将包下载下来并且加载到dependencies中去（npm 5.x开始不需要-save）
        - npm install  包名 -save-dev  将包下载下来并且加载到devDependencies中去
        - npm install  包名 -g  全局安装
        - npm install express@3.21.2 安装指导版本的包

    + update
        - npm update -g <package>  跟新全局包
        - npm outdated -g --depth=0 要找出哪些全局包需要更新
        - npm update -g 更新所有的全局包

    + uninstall
    - npm uninstall  <package> 加-D 或-S 移除依赖
    - npm uninstall -g <package>

    + npm <command> -h  quick help on <command>
    + npm docs 包名 查看包的文档

* package.json
    - npm init  创建package.json文件
    - npm init --yes 获得默认值
    - npm 启动 node 
        ```json
        "main": "lib/index.js",
        "bin": {
            "vm2": "./bin/vm2"
        },
        "scripts": {
            "start": "node ./bin/www",
            "test": "node ./bin/test",
            "qm":"node ./bin/test"
        },
        "dependencies":{},
        "devDependencies":{}
        ```
    - bin 字段指定了各个内部命令对应的可执行文件的位置。如果全局安装模块报，npm 会使用符号链接把可执行文件链接到 /usr/local/bin，如果项目中安装，会链接到 ./node_modules/.bin/。
    - [package.json](http://www.mujiang.info/translation/npmjs/files/package.json.html)
    - npx(npm5.2以上自带)
        + 应用场景:
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
    - 版本号
        - 1.2.3 (1表示重大更新,2表示向下兼容,3表示补丁包更新)
        - ">" +版本号   下载大于某个版本号，npm会下最新版
        - "<" +版本号   下载小于某个版本号，npm会下小于这个版本号最新版
        - "<=" 小于等于 一定会下你写的这个版本，除非没有你写的这个版本
        - ">=" 大于等于  下载最新版
        - " *、' '、X "  任意 npm会给你下最新版
        - "^" +版本号  不跃迁版本下载，^2.1.0 npm会下载大版本不变，去下载2.x.x版本里的最近版
        - "~" +版本号  会去下约等于这个版本的最新版，在大版本不变的情况下下一个比较新的版本

* 创建Node包,发布、更新
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
            
* 如何搭建私有仓库？