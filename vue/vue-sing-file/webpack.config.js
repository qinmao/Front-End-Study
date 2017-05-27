const WebpackHtmlPlugin = require('html-webpack-plugin');
module.exports = { // 必须有的结构
    // 所有配置都在{}内部
    // 指定入口文件
    entry: {
        // file1:'./a.js' 可以指定多个入口
        main: './main.js', //只针对一个入口的情况
    },
    // 指定出口文件
    output: {
        path: __dirname + '/dist/', //设置所有生成的出口文件的资源目录
        filename: 'build.js', //在当前目录下生成一个build.js

    },

    // 对于es6的一些代码，最好，我们需要转换
    module: {
        // 包含多个模块，这些模块为对应的代码提供了转化功能
        loaders: [{
            test: /.css$/, // 解析以css结尾的文件
            // 倒叙,先创建css，再通过style标签动态插入
            loader: 'style-loader!css-loader!autoprefixer-loader',
        }, {
            test: /.less$/, // 解析less后缀的文件
            loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
        }, {
            test: /.(jpg|svg|gif|png|jpeg|ttf)$/,
            loader: 'url-loader?limit=4096', //参数?limit= ?btye单位 字节  1kb = 1024

        }, {
            test: /.js$/, // 告诉webpack什么文件走这个loader:test要写正则表达式
            loader: 'babel-loader', // 依赖是babel-core
            exclude: /node_modules/, // 排除node_modules下的内容
            // 给loader添加额外的配置
            options: { // 除了这个配置带s的不是数组之外，其他大多都是数组
                // 设置ES6关键字的解析 在下载的时候babel-preset-es2015
                presets: ['es2015'],
                // 解析ES6的函数 下载的时候babel-plugin-transform-runtime
                plugins: ['transform-runtime'], //解析ES6的函数

            }

        }, {
            // 处理vue
            test:/.vue$/,
            loader:'vue-loader', //依赖 vue-template-compiler
        }]
    },
    plugins: [ // 每一个插件都是一个对象
        // 新创建一个webpackHtmlPlugin对象
        new WebpackHtmlPlugin({
            // 配置了output中的path以后，就知道把文件生成到哪里去了
            template: './index.html'
        })
    ]
};
