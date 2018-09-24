const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const plugins = require('./plugins')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const JSLoader = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

const CSSLoader = {
  test: /\.css$/,
  use: [
    !IS_PRODUCTION ? 'style-loader' : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it use publicPath in webpackOptions.output
        publicPath: '../'
      }
    },
    'css-loader',
    'postcss-loader',
  ]
}

// TODO: look into optimize-css-assets-webpack-plugin

module.exports = {
  JSLoader,
  CSSLoader,
}
