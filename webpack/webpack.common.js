const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-decorators-legacy',
                'syntax-dynamic-import',
                'transform-runtime'
              ],
              presets: ['es2015', 'stage-0', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp4)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'file-loader'
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new CleanWebpackPlugin({
      // 在文件被发送到输出目录之前再执行clean操作
      beforeEmit: true
    }),
    // new BundleAnalyzerPlugin()
    // new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000, // 提高缓存利用率，这需要在http2/spdy
      maxSize: 0, // 没有限制
      minChunks: 2, // 共享最少的chunk数，使用次数超过这个值才会被提取
      maxAsyncRequests: 5, // 最多的异步chunk数
      maxInitialRequests: 5, // 最多的同步chunks数
      automaticNameDelimiter: '~', // 多页面共用chunk命名分隔符
      name: true,
      // 声明公共chunk
      cacheGroups: {
        vendor: {
          // 过滤需要打入的模块
          test: (module) => {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/]/].every((reg) => reg.test(module.resource));
              const exclude = [/[\\/]node_modules[\\/](react|redux|antd|bizcharts)/].some((reg) => reg.test(module.resource));
              return include && !exclude;
            }
            return false;
          },
          name: 'vendor',
          priority: 50, // 确定模块打入的优先级
          reuseExistingChunk: true, // 使用复用已经存在的模块
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
};
