'use strict';

const webpack = require('webpack');

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  );
}

module.exports = {
  entry: './browser/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  plugins: plugins,
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      }]
    }]
  }
};
