const { merge } = require('webpack-merge');
const base = require('./webpack.config.base.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin(), new CssMinimizerPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
});
