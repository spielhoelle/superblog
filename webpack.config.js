const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
console.log('#####', dotenv);

var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./src"),
    filename: 'bundle.js',
    publicPath: './src'
  },
  devServer: {
    inline: true,
    port: 8080,
  },

  module: {
    rules: [ 
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
    ]
  },
    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        VERSION: JSON.stringify('5fa3b9'),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: '1+1',
        'typeof window': JSON.stringify('object'),
        'process.env': JSON.stringify(process.env)
      })
    ]

}
console.log('#####', process.env);

module.exports = config;
