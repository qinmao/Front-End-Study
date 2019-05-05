const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        globalObject: 'this'
    },
    resolveLoader: {
        modules: [
            // '/Users/qm/Desktop/vue-cli3.x/itry-mul-task-h5/node_modules/@vue/cli-plugin-babel/node_modules',
            // 'node_modules',
            // '/Users/qm/Desktop/vue-cli3.x/itry-mul-task-h5/node_modules',
            // '/Users/qm/Desktop/vue-cli3.x/itry-mul-task-h5/node_modules/@vue/cli-service/node_modules'
        ]
    },
    devServer: {

    },
    plugins: [
        /* config.plugin('hmr') */
        new HotModuleReplacementPlugin(),
    ]
})