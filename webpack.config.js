const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'index.js'
    },
    module: {
        rules: [
            { test: /\.(jsx?)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
            { test: /\.(jpg|jpeg|gif|png|svg)$/, use: 'file-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({}),

        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html'
        })
    ],

    devServer: {
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true
    }
};
