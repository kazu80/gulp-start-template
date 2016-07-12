'use strict';

var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports =  {
    webpack :  {
        cache: true,
        watch: true,
        keepalive: true,

        output: {
            filename: './app/root/asset/js/[name].js'
        },

        devtool: "source-map",

        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract("style-loader","css-loader")
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin("./app/root/asset/css/[name].css"),
            new BrowserSyncPlugin({
                server: {
                    baseDir: './app/root'
                },
                browser: 'Google Chrome'
            })
        ]
    }
};
