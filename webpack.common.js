const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const deps = require('./package.json').dependencies

module.exports = {
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main-bundle-[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@': path.join(__dirname, 'src')
    },
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: [/node_modules/, /build/],
    }, {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {
          loader: 'sass-loader'
        },
      ],
    }],
  },
  plugins: [
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[hash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }]
    }),
  ],
}
