"use strict";

/*
  for more information about how to configure
  revise lectures 134 to 136 in Jonas Schmidtmann JS full course.
*/
var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html"
  })],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
};