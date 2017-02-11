const path = require('path');
const webpack = require('webpack');

const config = {
  entry: [
    'webpack/hot/dev-server',
    './src/public/main.js'
  ],
  output: {
    path: path.join(__dirname, '../src/public/dist/assets/'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, '../src/public/')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.join(__dirname, '../src/public/components/')
      }
    ]
  }
};

module.exports = config;
