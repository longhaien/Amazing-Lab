const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const config = {
    mode: 'development',
    entry: {
        index: './src/entry/index.js',
        page_1: './src/entry/page_1.js'
    },
    output: {
        filename: '[name].js',
        path: '/dist/static'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }
        }, {
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: '/src/index.html'})
    ]
};

module.exports = config;