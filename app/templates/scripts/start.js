'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const paths = require('../config/paths');
const config = require('../config/webpack.config');

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

const devServerConfig = {
  host: HOST,
  port: PORT,
  contentBase: paths.distSrc,
  hot: true,
  historyApiFallback: true
};

const compiler = webpack(config('development'));
const devServer = new WebpackDevServer(compiler, devServerConfig);

devServer.listen(PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk`
    {bgGreen.black  Starting server... }
  `);
  console.log();
});
