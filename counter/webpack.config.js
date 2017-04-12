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
        loader: 'babel',
        exclude:/node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}