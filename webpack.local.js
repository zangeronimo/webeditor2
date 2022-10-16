const path = require('path')
const { DefinePlugin } = require('webpack')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

const REACT_APP_WEB = 'http://localhost:3000'
// const API_URL = 'https://localhost:7038'
const API_URL = 'https://webeditordotnetapi.tudolinux.com.br'

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './build'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },
  plugins: [
    new DefinePlugin({
      'process.env.REACT_APP_WEB': JSON.stringify(REACT_APP_WEB),
      'process.env.API_URL': JSON.stringify(API_URL),
    }),
  ],
})

