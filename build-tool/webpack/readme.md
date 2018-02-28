## webpack
## webpack是什么？
 1. webpack是一个module bundler(模块打包工具)，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。Webpack对它们进行统 一的管理以及打包发布
 2. 参考： 官网：http://webpack.github.io/docs/  先过这三个文档文档
    Webpack-handlebook: http://zhaoda.net/webpack-handbook/
    Gitbook: http://fakefish.github.io/react-webpack-cookbook/index.html
## 为什么使用 webpack？
 1. 对 CommonJS 、 AMD 、ES6的语法做了兼容
 2. 对js、css、图片等资源文件都支持打包
 3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持
 4. 有独立的配置文件webpack.config.js
 5. 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
 6. 支持 SourceUrls 和 SourceMaps，易于调试
 7. 具有强大的Plugin接口，大多是内部插件，使用起来比较灵活
 8. webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快
## 安装
 npm  install  webpack  -g 
## 配置文件
 在项目根目录创建三个或多个webpack配置文件
 1. webpack.base.config.js  //公用的配置放在这里面（可通过插件继承）
 2. webpack.develop.config.js  //开发环境中用到的配置文件
 3. webpack.publish.config.js   //生产环境中用到的配置文件
## 运行（打包构建）
 1. 通过配置文件运行（通用）Cmd 运行 Webpack 命令默认会去查找名称为webpack.config.js的文件执行，如果没有就会报配置信息没有配置的错误。把运行命令配置到npm的script中在 package.json 中设置 scripts 的值就可以了。
    "scripts": {
        "develop": "webpack --config webpack.develop.config.js",
        "publish": "webpack --config webpack.publish.config.js"
    },
  cmd中执行  npm  run  develop
 2. 通过cli命令运行 (webpack  -h 查看帮助) 不推荐使用
    Webpack  -watch       // webpack的监视命令，文件发生变化自动编译
    webpack --entry ./entry.js --output-path dist --output-file bundle.js
    //配置文件的启动目录和输出目录
    webpack 最基本的启动webpack命令
    webpack -w 提供watch方法，实时进行打包更新
    webpack -p 对打包后的文件进行压缩
    webpack -d 提供SourceMaps，方便调试
    webpack --colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
    webpack --profile 输出性能数据，可以看到每一步的耗时
    webpack --display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
    webpack --display-error-details 方便出错时能查阅更详尽的信息（比如 webpack 寻找模块的过程），从而更好定位到问题。
 3. 作为nodejs的api运行
    var webpack = require('webpack');
    webpack({
    //configuration
    }, function(err, stats){});
## 调试
 1. webpack-dev-server
    开发服务器会监听每一个文件的变化，进行实时打包，并且可以推送通知前端页面代码发生了变化，从而可以实现页面的自动刷新。
    "test": "webpack-dev-server --inline --hot --open --port  8080",
    inline 刷新
    hot 热替换
    open --port 在9999 端口打开
    test 是内置的命令不需要 run 
    npm test 就可以在浏览器中进行显示
 2. webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
    --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
    --progress - 显示合并代码进度
    --colors -- hot，命令行中显示颜色！
    --content-base  指向设置的输出目录//这点一定是我们的发布目录
 3. 注意：
    (1)用webpack-dev-server生成bundle.js文件是在内存中的，并没有实际生成
    (2)如果引用的文件夹中已经有bundle.js就不会自动刷新了，你需要先把bundle.js文件手动删除
    （3）用webstorm的注意了，因为他是自动保存的，所以可能识别的比较慢，你需要手动的ctrl+s一下
## 加载器 loader
 Loader：这是webpack准备的一些预处理工具，以下是一些常用的 常见配置参见配置文件
 1. 编译jsx和ES6到原生js
    先安装依赖npm install babel-loader babel-core babel-preset-env webpack --save-dev
 2. css 
 3. less
 4. sass
 5. photo
 6. file
## 部署
 "publish": " webpack --config webpack.publish.config.js  -p",
	指向生产的配置文件，并且加上了webpack的cli的-p,他会自动做一些优化
1. 提取js公共部分插件
   webpack内置的，无需下载 CommonsChunkPlugin
2. 下载 html-webpack-plugin   可在dist 文件夹生成index.html
3. 下载 uglifyjs-webpack-plugin 压缩混淆js 可用webpack -p 代替
4. 下载 extract-text-webpack-plugin 抽离 从 build.js 抽离css 到dist 
## 和gulp 的集成
 1. 参考 分为使用流和不使用流
    http://webpack.github.io/docs/usage-with-gulp.html
    gulp + webpack 构建多页面前端项目
    http://cnodejs.org/topic/56df76559386fbf86ddd6916
    github-demo实际例子: https://github.com/MeCKodo/webpack