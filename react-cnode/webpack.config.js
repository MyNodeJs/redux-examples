module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: "url-loader?limit=40000"
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
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
