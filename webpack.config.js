var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js',
    './src/index.styl'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".css", ".styl"]
  },
  module: {
    loaders: [
      {test: /\.js$|\.jsx$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.styl$|\.css$/, loaders: ["style", "css", "stylus"]}
    ]
  }
};
