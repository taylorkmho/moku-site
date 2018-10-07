require('dotenv').config({ silent: true })

const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const pkg = require(__dirname + '/package.json')
const loaders = require('./webpack/loaders')
const plugins = require('./webpack/plugins')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const siteJs = ['./scripts/site.js']

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: IS_PRODUCTION ? false : 'source-map',
  entry: {
    'scripts/site-bundle': siteJs,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          beautify: !IS_PRODUCTION,
          compress: IS_PRODUCTION
            ? {
                drop_console: true, // eslint-disable-line camelcase
                warnings: false,
              }
            : false,
          mangle: IS_PRODUCTION
            ? {
                reserved: ['_'], // don't mangle lodash
              }
            : false,
        },
      }),
    ],
  },
  plugins: [plugins.MiniCssExtractPlugin, plugins.DebugPlugin],
  module: {
    rules: [loaders.JSLoader, loaders.CSSLoader],
  },
}
