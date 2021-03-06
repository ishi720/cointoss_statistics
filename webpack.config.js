const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: `./src/index.js`,
  output: {
    path: __dirname + '/dist' ,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false
          }
        }
      ],
    }]
  }
};