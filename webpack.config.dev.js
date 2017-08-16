const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// here we get the hash created by the HTML generator,
// which is passed to us in the --define CLI arg
// --define isn't supposed to be used like this, but we're not using it for anything else so why not.
// Webpack throws on unknown CLI args.
// we're certain that the --define options is specified, so this is safe
const hash = process.argv[process.argv.indexOf('--define') + 1];

const scss = new ExtractTextPlugin({ filename: `styles-${hash}.css` });

module.exports = {
  entry: path.join(__dirname, 'components', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `main-${hash}.js`
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
              options: { sourceMap: true, minimize: true }
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
