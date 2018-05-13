const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map", // sourcemaps are removed on packaging
  entry: {
    popup: "./src/popup.js",
    background: "./src/background.js",
    contentScript: "./src/contentScript.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
