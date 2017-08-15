const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

config.devtool = false;
// remove the DefinePlugin which sets development to true
config.plugins = config.plugins
  .filter(plugin => !(plugin instanceof webpack.DefinePlugin));

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
        ENV: { development: false }
    })
);

module.exports = config;
