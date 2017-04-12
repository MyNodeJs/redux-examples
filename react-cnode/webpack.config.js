module.exports= {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude:/node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://www.reddit.com',
        secure: false,
        pathRewrite: {'^/api' : '/r'},
        changeOrigin: true
      }
    }
  }
}