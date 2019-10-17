const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash'); 
const webpack = require('webpack'); 

module.exports = {
    entry: { main: './src/script/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use:  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            

        ]
    },
    plugins: [ 
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
        
    ],
    // homepage: {
    //     "name": "...",
    //     "homepage": "https://maxim-ba.github.io/sprint11-webpack-assembly/", 
    //     "version": "...",
    //     "description": "..."
    //     }
};
