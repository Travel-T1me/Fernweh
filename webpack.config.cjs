const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: './src/index.ejs',  // Replace with the path to your .ejs file
      filename: 'index.html',              // Output filename
      inject: true                         // Will inject the main bundle to the end of the body tag
  }
  ), new MiniCssExtractPlugin()],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "assets"),
        publicPath: "/assets",
      },
    ],
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
      }
    },
    port: 3000,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
};