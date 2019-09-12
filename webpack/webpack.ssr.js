const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    server: path.resolve(__dirname, '../src/server.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, "../src"),
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
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      // 在文件被发送到输出目录之前再执行clean操作
      beforeEmit: true
    }),
  ],
  target: 'node',
  mode: 'production'
};
