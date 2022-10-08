const { DefinePlugin } = require("webpack");
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const REACT_APP_WEB = 'https://webeditor2.tudolinux.com.br'
const API_URL = 'https://webeditordotnetapi.tudolinux.com.br'

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      'process.env.REACT_APP_WEB': JSON.stringify(REACT_APP_WEB),
      'process.env.API_URL': JSON.stringify(API_URL),
    }),
  ],
})
