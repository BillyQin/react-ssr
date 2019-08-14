const webpack = require('webpack');
// const Config = require('../config/config');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  entry: {
    app: [path.resolve(__dirname, 'src/index.js')]
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: "/",
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: true,
    port: 3003,
    host: 'localhost',
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  mode: 'development'
});