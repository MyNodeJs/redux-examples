var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var publicPath = '/'; //服务器路径
var path = __dirname + '/';

var plugins = [new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()];

if (process.argv.indexOf('-p') > -1) { //生产环境
    plugins.push(new webpack.DefinePlugin({ //编译成生产版本
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
}
plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包

plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: 'index.html', //生成的html存放路径，相对于 path
    template: './template/index.html', //html模板路径
    hash: true,    //为静态资源生成hash值
}));

module.exports = {
  devtool: "eval-cheap-module-source-map",
  entry: {
      app: './index', //编译的入口文件
  },
  output: {
    path: path,
    publicPath: publicPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: "babel-loader",
          query: {
            presets: ["react", "es2015", "stage-0"]
          }
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [{
          loader: "url-loader",
          query: {
            limit: 40000
          }
        }]
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      }
    ]
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    inline: true,
    proxy: {
      "/api/v1": {
        target: "https://cnodejs.org",
        secure: false,
        pathRewrite: { "^/api/v1": "/api/v1" },
        changeOrigin: true
      }
    }
  }
};
