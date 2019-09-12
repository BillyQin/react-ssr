const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {
    app: [path.resolve(__dirname, '../src/index-client.jsx')]
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
    ]
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
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html',
      // favicon: 'favicon.ico',
      inject: true,
      minify: {
        html5: true
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  mode: 'development'
});
