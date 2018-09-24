const { DefinePlugin } = require('webpack')
const _MiniCssExtractPlugin = require("mini-css-extract-plugin")
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: "[name].css",
  chunkFilename: "[id].css"
})

const DebugPlugin = new DefinePlugin({
  '__DEBUG__': JSON.stringify(!IS_PRODUCTION)
})

module.exports = {
  DebugPlugin,
  MiniCssExtractPlugin,
}
