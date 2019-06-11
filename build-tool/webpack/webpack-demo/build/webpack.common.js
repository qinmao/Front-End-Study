const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index.js'
    },
    resolve: {
        // 配置项通过别名来将原导入路径映射成一个新的导入路径
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // 运行时版本，没有编译器文件更小
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions: [
            //  在导入语句没带文件后缀时，Webpack 会在自动带上后缀后去尝试询问文件是否存在。
            // 默认是：extensions :[‘. js ‘,’. json ’] 。
            // 也就是说，当遇到require ( '. /data ’）这样的导入语句时，Webpack会先去寻找./data .js 文件，如果该文件不存在，就去寻找./data.json 文件，如果还是找不到就报错。
            // 如果这个列表越长，或者正确的后缀越往后，就会造成尝试的次数越多
            '.js',
            '.vue',
            '.json'
        ],
        modules: [
            //  用于配置Webpack去哪些目录下寻找第三方模块，先去当前目录的/node modules目录下去找我们想找的模块，
            // 如果没找到，就去上一级目录../node modules中找，一直到根下的node modules
            // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
            'node_modules',
            // '/Users/qm/Desktop/vue-cli3.x/itry-mul-task-h5/node_modules',
            // '/Users/qm/Desktop/vue-cli3.x/itry-mul-task-h5/node_modules/@vue/cli-service/node_modules'
        ]
    },
    module: {
        //  noParse配置项可以让Webpack忽略对部分没采用模块化的文件的递归解析和处理，提高构建性能
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            /* config.module.rule('images') */
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    /* config.module.rule('images').use('url-loader') */
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            /* config.module.rule('svg') */
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    /* config.module.rule('svg').use('file-loader') */
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            /* config.module.rule('fonts') */
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    /* config.module.rule('fonts').use('url-loader') */
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        // 生成输出文件先清理
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '管理输出'
        })
    ]
};