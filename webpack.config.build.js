var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/',
        publicPath:"/resources/vue/order/js",
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                // C:\Work\product\geeko\node_modules\pdfjs-dist
                include:[path.resolve(__dirname,'src'),path.resolve(__dirname,'test'),path.resolve(__dirname,'node_modules/pdfjs-dist/es5')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader'
                    },
                    extractCSS: process.env.NODE_ENV === 'production'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            title: 'index',
            template: './index.ejs',
            filename: 'index.html'
        })
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './dist',
        proxy: {
            '/api': {
                target: 'http://localhost:8080/wanna/',
                // target: 'https://www.chicme.xyz/',
                pathRewrite: { '^/api': '' },
                secure: false
            }
        }
    },
    devtool: 'eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new ExtractTextPlugin({ filename: 'app.css' })
    ]);
}
