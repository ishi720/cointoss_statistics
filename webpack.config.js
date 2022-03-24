const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: `./src/index.js`,
  output: {
    path: __dirname + '/dist' ,
    filename: 'bundle.js'
  }
};