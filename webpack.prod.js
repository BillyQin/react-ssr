const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    filename: '[name].[contenthash:8].js',
    // publicPath: "/",
    path: path.resolve(__dirname, './dist/static'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-decorators-legacy',
                "syntax-dynamic-import",
                "transform-runtime"
              ],
              presets: ['es2015', 'stage-0', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    modules: [path.resolve(__dirname, './node_modules')]
  },
  plugins: [
    new CleanWebpackPlugin({
      // 在文件被发送到输出目录之前再执行clean操作
      beforeEmit: true
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html',
      // favicon: 'favicon.ico',
      inject: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].css',
    })
  ],
  mode: 'production'
};