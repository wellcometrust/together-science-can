const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const scss = new ExtractTextPlugin({ filename: 'styles.css' });

module.exports = {
  entry: path.join(__dirname, 'components', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.js'
  },
  devtool: 'cheap-module-source-map', // enable source maps
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=env', 'eslint-loader?fix=true']
      },
      {
        test: /\.scss$/,
        use: scss.extract({
          use: [
            {
              loader: "css-loader",
              options: { sourceMap: true }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: { development: true }
    }),
    scss
  ]
}
