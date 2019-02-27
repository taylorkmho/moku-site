require('dotenv').config({ silent: true })

const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const pkg = require(__dirname + '/package.json')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const siteJs = path.resolve(__dirname, 'scripts', 'site.js')
const siteCss = path.resolve(__dirname, 'styles', 'styles.scss')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: IS_PRODUCTION ? false : 'source-map',
  entry: [siteJs, siteCss],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './scripts/site-bundle.js',
  },
  stats: {
    entrypoints: false,
    children: false,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/styles/bundle.less',
      chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __DEBUG__: JSON.stringify(!IS_PRODUCTION),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          // 'postcss-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
}
