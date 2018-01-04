const path = require('path');

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './src/bundle.js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/, loader: 'dust-loader-complete' },
    ],
  },
  resolve: {
    alias:
      { 'dust.core': 'dustjs-linkedin' },
  },
};
