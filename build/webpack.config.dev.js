const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.config.base.js');
const { join } = require('path');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: join(__dirname, '../public'),
    inline: true,
    hot: true,
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: {
      index: '/',
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
});
