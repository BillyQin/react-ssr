const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {
    server: path.resolve(__dirname, '../src/server.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
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
  target: 'node',
  mode: 'production',
});
