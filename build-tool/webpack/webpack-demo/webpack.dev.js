const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common,{
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer:{

    },
    plugins: [
        
    ]
})