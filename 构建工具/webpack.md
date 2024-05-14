# webpack
## Webpack 的运行流程
+ 是一个串行的过程，从启动到结束会依次执行以下流程 :
    1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。
    2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。
    3. 确定入口：根据配置中的 entry 找出所有的入口文件。
    4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
    5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
    6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
    7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
## Webpack 内置的插件
* ProvidePlugin 
    - 自动加载模块,避免到处 import or require 
    ```js
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Vue: ['vue/dist/vue.esm.js', 'default'],
        });
    ```
    - 使用ProvidePlugin的三种方式
    ```js
        // 方式1 直接引入
        new webpack.ProvidePlugin({
            $_: 'lodash',
        });
        // 方式2 引入某个函数
        new webpack.ProvidePlugin({
            $_uniqBy: ['lodash','uniqBy']
        });
        // 方式3 export default
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default']
        });
    ```
    + 解决了哪些问题：
        - 减少代码量
        - 解决了import进来之后的自定义名称可能会不统一，导致全局搜索困难
    + 注意：
        - eslint的globals增加$_的配置
         ```js
            // .eslintrc.js
            globals: {
                $_: 'readonly', // 或者true
            },
         ```
        + 使用
            - js 文件使用 $_.uniqBy
            - template使用：Vue的模板语法中，不支持直接对以$或者_开头的自定义data属性，目的是避免与Vue的内部冲突，推荐在methods中绑定
            ```vue
                <template>
                    <p>{{$_(...)}</p>
                </template>
                export default {
                    methods: {
                        $_
                    }
                }
            ```
* DefinePlugin
    - 编译时配置的全局常量
    - 开发环境构建和生产环境构建之间产生不同行为来说非常有用
    ```js
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object'),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ```
    - vue-cli 3.0+ 中，只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中
## vue-cli 中 webpack 的配置的区别
* configureWebpack 不能同时存在
    - 作为对象 简单的配置
    - 作为函数 区分环境配置
    ```js
        // 简单的配置
        // configureWebpack: {
        //   plugins: [
        //     // new MyAwesomeWebpackPlugin()
        //   ],
        // },
        // 区分环境的配置
        configureWebpack: config => {
            if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            //  启用GZip压缩
            const compressionPlugin = new CompressionPlugin({
                filename: '[path].gz[query]',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                threshold: 10 * 1024, // 仅处理大于此大小的资产（以字节为单位）
            })
            
            config.plugins.push(compressionPlugin)
            } else {
            // 为开发环境修改配置...
            }
        },
    ```
* chainWebpack
  - 修改 Vue CLI 内部的 webpack 配置，允许我们更细粒度的控制其内部配置
