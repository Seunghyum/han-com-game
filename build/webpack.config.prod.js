const { merge } = require('webpack-merge');
const base = require('./webpack.config.base.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new CleanWebpackPlugin()],
});
