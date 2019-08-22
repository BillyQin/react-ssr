const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          {loader: 'ts-loader'}
        ]
      },
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          'file-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', 'tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    // new CleanWebpackPlugin('dist', {
    //   root: path.resolve(__dirname, '..'),
    //   // 在文件被发送到输出目录之前再执行clean操作
    //   beforeEmit: true
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      // favicon: 'favicon.ico',
      inject: true,
      minify: {
        html5: true
      }
    }),
    // new BundleAnalyzerPlugin()
    // new FriendlyErrorsWebpackPlugin(),

  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000, // 提高缓存利用率，这需要在http2/spdy
      maxSize: 0,//没有限制
      minChunks: 2,// 共享最少的chunk数，使用次数超过这个值才会被提取
      maxAsyncRequests: 5,//最多的异步chunk数
      maxInitialRequests: 5,// 最多的同步chunks数
      automaticNameDelimiter: '~',// 多页面共用chunk命名分隔符
      name: true,
      // 声明公共chunk
      cacheGroups: {
        vendor: {
          // 过滤需要打入的模块
          test: module => {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/]/].every(reg => {
                return reg.test(module.resource);
              });
              const exclude = [/[\\/]node_modules[\\/](react|redux|antd|bizcharts)/].some(reg => {
                return reg.test(module.resource);
              });
              return include && !exclude;
            }
            return false;
          },
          name: 'vendor',
          priority: 50,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
        },
        react: {
          test({ resource }) {
            return /[\\/]node_modules[\\/](react|redux)/.test(resource);
          },
          name: 'react',
          priority: 20,
          reuseExistingChunk: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd/,
          name: 'antd',
          priority: 15,
          reuseExistingChunk: true,
        },
        bizcharts: {
          test: /[\\/]node_modules[\\/]bizcharts/,
          name: 'bizcharts',
          priority: 15,
          reuseExistingChunk: true,
        }
      }
    }
  },
  stats: 'none'
};