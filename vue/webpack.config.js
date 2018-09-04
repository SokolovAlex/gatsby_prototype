const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

//   entry: {
//     app: './src/client-entry.js',
//     vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
//   },

module.exports = {
    entry: './src/entry-client.js',
    output: { 
        path: path.resolve(__dirname, './dist'),
        publicPath: '/output/'
    },
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
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
          'process.env.VUE_ENV': '"client"'
        }),
        new VueLoaderPlugin(),
        new VueSSRClientPlugin()
      ]
}