const webpack = require('webpack');
const config = require('./webpack/conf.dev.js');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const configs = require('./src/configs');

config.entry.unshift(`webpack-dev-server/client?http://${configs.webpack.host}:${configs.webpack.port}/`);
const complier = webpack(config);

const server = new WebpackDevServer(complier, {
  hot: true,
  historyApiFallback: false,
  contentBase: path.join(__dirname, 'src/public/'),
  publicPath: config.output.publicPath
});

server.listen(configs.webpack.port, configs.webpack.host, (err) => {
  if (err) {
    console.error(err.stack);
  }
});
