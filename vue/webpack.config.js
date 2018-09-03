const path = require('path')
const webpack = require('webpack')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
    entry: './src/entry-client.js',
    output: { path: path.resolve(__dirname, './dist') },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
    externals: Object.keys(require('./package.json').dependencies),
    devtool: 'source-map',
}