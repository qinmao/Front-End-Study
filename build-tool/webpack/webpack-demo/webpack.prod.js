const path = require('path');
const merge = require('webpack-merge');
import Webpack from 'webpack';
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash:8].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[contenthash:8].js'
    },
    plugins: [
        // 用来防止vendor文件的 hash 在构建保持一致
        new Webpack.HashedModuleIdsPlugin({
            hashDigest: 'hex'
        }),
        new Webpack.DefinePlugin(
            {
              'process.env': {
                NODE_ENV: '"production"',
                VUE_APP_BASE_URL: '/api',
                VUE_APP_VERSION: '1.0.0',
                BASE_URL: '/'
              }
            }
          ),
    ],
    optimization: {
        minimizer: [{
            options: {
                test: /\.m?js(\?.*)?$/i,
                chunkFilter: () => true,
                warningsFilter: () => true,
                extractComments: false,
                sourceMap: false,
                cache: true,
                cacheKeys: defaultCacheKeys => defaultCacheKeys,
                parallel: true,
                include: undefined,
                exclude: undefined,
                minify: undefined,
                terserOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/i
                    },
                    compress: {
                        arrows: false,
                        collapse_vars: false,
                        comparisons: false,
                        computed_props: false,
                        hoist_funs: false,
                        hoist_props: false,
                        hoist_vars: false,
                        inline: false,
                        loops: false,
                        negate_iife: false,
                        properties: false,
                        reduce_funcs: false,
                        reduce_vars: false,
                        switches: false,
                        toplevel: false,
                        typeofs: false,
                        booleans: true,
                        if_return: true,
                        sequences: true,
                        unused: true,
                        conditionals: true,
                        dead_code: true,
                        evaluate: true
                    },
                    mangle: {
                        safari10: true
                    }
                }
            }
        }],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    // 避免降外部的模块打包进应用程序
    externals: {

    }
})