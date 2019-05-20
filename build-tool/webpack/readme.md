## webpack(v4+)
## webpack是什么？
 * webpack是一个module bundler(模块打包工具)，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。Webpack对它们进行统 一的管理以及打包发布
 * 参考：
  [官网](https://webpack.docschina.org/ 先过这三个文档文档)
   [Webpack-handlebook](http://zhaoda.net/webpack-handbook/) 
   [Gitbook](http://fakefish.github.io/react-webpack-cookbook/index.html)

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
   ```
   npm  install  webpack  -g 

   ```

## webpack 中的核心概念
 * Entry 
 * Output
 * Loaders: 
   - 由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件

* Plugins:
   - 从打包优化和压缩，一直到重新定义环境中的变量。比如对js文件进行压缩优化的UglifyJsPlugin插件

* Chunk:
   - coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin

6. mode 
   - 通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。

## 配置文件
 >在项目根目录创建三个或多个webpack配置文件
 1. webpack.common.config.js  
 2. webpack.dev.config.js  
 3. webpack.prod.config.js   

## 能够明白的问题
## webpack 和其他自动化构建工具（gulp、grunt、rollup）有哪些区别？
1. webpack 是 module bundle
2. gulp 是 task runner
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
 > 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

 > 首先要知道server端和client端都做了处理工作s

* 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。

* 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。

* 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。

* 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。

* webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。

* HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
* 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。

* 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。


## webpack 构建优化？
 * [官方提高构建性能的最佳实践](https://webpack.docschina.org/guides/build-performance/)

 * 减少构建时间
    + 优化Loader
        > 原因：主要因为 Babel 转换js 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，转换代码越多，效率就越低
        - 优化 Loader 的文件搜索范围,只转化src(自己写的js)
        - 将 Babel 编译过的文件缓存起来,下次只需要编译更改过的代码文件即可

    + 多线程构建：（HappyPack 工具）Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，使用多线程构建，充分利用系统资源

    + DllPlugin 将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数

    + 代码压缩 Webpack4 将 mode 设置为 production，并行压缩js css html

    + 其他小技巧
        - resolve.extensions：我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面，没加文件后缀时，默认搜索顺序['.js', '.json']
        - resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
        - module.noParse：若确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助

 * 减少构建后包的体积
    - 按需加载
    - Scope Hoisting:Webpack4 开启 optimization.concatenateModules=true
    - Tree Shaking:可以实现删除项目中未被引用的代码 Webpack4 生产环境自动开启了
    - externals 配置来提取常用库,不打包进项目


