const webpack = require('atool-build/lib/webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(webpackConfig, env) {
    webpackConfig.output.publicPath="/";
    webpackConfig.babel.plugins.push('transform-runtime');
    webpackConfig.babel.plugins.push(['import', {
        libraryName: 'antd',
        style: true  // if true, use less
    }]);

    // Support hmr
    if (env === 'development') {
        webpackConfig.devtool = '#eval';
        webpackConfig.babel.plugins.push('dva-hmr');
    } else {
        webpackConfig.babel.plugins.push('dev-expression');
    }

    // Don't extract common.js and common.css
    webpackConfig.plugins = webpackConfig.plugins.filter(function(plugin) {
        return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
    });


    webpackConfig.plugins.push(
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename:"./index.html",
            minify: {//压缩html
                collapseWhitespace: true,//去除空格
                removeComments: true //去除注释
            },
        })
    )


    // Support CSS Modules
    // Parse all less files as css module.
    webpackConfig.module.loaders.forEach(function(loader, index) {
        if(loader.test.toString() === '/\\.html?$/'){
            loader.loader = "ejs";
        }

        if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
            loader.include = /node_modules/;
            loader.test = /\.less$/;
        }
        if (loader.test.toString() === '/\\.module\\.less$/') {
            loader.exclude = /node_modules/;
            loader.test = /\.less$/;

        }
        if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
            loader.include = /node_modules/;
            loader.test = /\.css$/;
        }
        if (loader.test.toString() === '/\\.module\\.css$/') {
            loader.exclude = /node_modules/;
            loader.test = /\.css$/;
        }
    });

    return webpackConfig;
};


