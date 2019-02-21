const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const JSLoader = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
}

const CSSLoader = {
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it use publicPath in webpackOptions.output
        publicPath: '../',
      },
    },
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        data: `
          @import 'styles/base.scss';
          @import 'styles/mixins.scss';
        `,
      },
    },
    'postcss-loader',
  ],
}

const VueLoader = {
  test: /\.vue$/,
  use: 'vue-loader',
}

// TODO: look into optimize-css-assets-webpack-plugin

module.exports = {
  JSLoader,
  CSSLoader,
  VueLoader,
}
