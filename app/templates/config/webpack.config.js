'use strict';

const postcssNormalize = require('postcss-normalize');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

const publicPath = '/';

module.exports = (mode) => {

  return {
    mode: mode || 'none',
    devtool: mode === 'development' ? 'cheap-module-source-map' : false,
    entry: ['@babel/polyfill', paths.indexSrc],
    output: {
      filename: 'js/bundle.[hash:10].js',
      publicPath,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: [/\.jpe?g$/, /\.gif$/, /\.png$/, /\.svg$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'assets/[name].[hash:10].[ext]',
          },
        },
        {
          test: [/\.ico$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/[name].[hash:10].[ext]',
          },
        },
        {
          test: [/\.js$/, /\.jsx$/],
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true
          },
        },
        {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                  postcssNormalize({ forceImport: 'sanitize.css' }),
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.htmlSrc,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    performance: {
      hints: mode === 'development' ? false : 'warning',
    }
  };
};
