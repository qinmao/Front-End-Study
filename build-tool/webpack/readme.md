## webpack(v4+)
## webpack是什么？
 1. webpack是一个module bundler(模块打包工具)，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。Webpack对它们进行统 一的管理以及打包发布
 2. 参考： 官网：https://webpack.docschina.org/ 先过这三个文档文档
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
## webpack 中的核心概念
1. Entry 
2. Output
3. Loaders: 
由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
4. Plugins:
从打包优化和压缩，一直到重新定义环境中的变量。比如对js文件进行压缩优化的UglifyJsPlugin插件
5. Chunk:
coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin
6. mode 
通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。
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
## 部署
 "publish": " webpack --config webpack.publish.config.js  -p",
	指向生产的配置文件，并且加上了webpack的cli的-p,他会自动做一些优化
1. 提取js公共部分插件
   webpack内置的，无需下载 CommonsChunkPlugin
2. 下载 html-webpack-plugin   可在dist 文件夹生成index.html
## 和gulp 的集成
 1. 参考 分为使用流和不使用流
    http://webpack.github.io/docs/usage-with-gulp.html
    gulp + webpack 构建多页面前端项目
    http://cnodejs.org/topic/56df76559386fbf86ddd6916
    github-demo实际例子: https://github.com/MeCKodo/webpack
## 能够明白的问题
## webpack 和其他自动化构建工具（gulp、grunt、rollup）有哪些区别？
1. webpack 是 module bundle
2. gulp 是 tast runner
3. Rollup 是在 Webpack 流行后出现的替代品。Rollup 在用于打包 JavaScript 库时比 Webpack 更加有优势，因为其打包出来的代码更小更快。
## webpack 打包的过程（构建流程）
1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
## webpack 热更新(HMR)的原理?
这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

首先要知道server端和client端都做了处理工作

1. 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。

2. 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。

3. 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。

4. 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。

5. webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。

6. HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
7. 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。

8. 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。
## tree shaking
描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，
例如 import 和 export。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。
## webpack 提高构建速度？
官方提高构建性能的最佳实践
https://webpack.docschina.org/guides/build-performance/
### 通用环境
1. 使用最新的 webpack 版本。我们会经常进行性能优化。
2. 将 Node.js 更新到最新版本，也有助于提高性能。除此之外，将你的 package 管理工具（例如 npm 或者 yarn）更新到最新版本，也有助于提高性能。较新的版本能够建立更高效的模块树以及提高解析速度。
### 具体步骤
1. 多入口情况下，使用CommonsChunkPlugin来提取公共代码
2. 通过externals配置来提取常用库
3. 利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
4. 使用Happypack 实现多线程加速编译
5. 使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度
6. 使用Tree-shaking和Scope Hoisting来剔除多余代码
