'use strict';

const path = require('path');

const getRealPath = relativePath => path.resolve(process.cwd(), relativePath);

module.exports = {
  distSrc: getRealPath('dist'),
  assetsSrc: getRealPath('assets'),
  htmlSrc: getRealPath('assets/index.html'),
  indexSrc: getRealPath('src/index.jsx'),
  appSrc: getRealPath('src'),
  publicUrl: getRealPath('/'),
};
