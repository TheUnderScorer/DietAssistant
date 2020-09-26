const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main/main.ts",
    preload: "./src/main/preload.js"
  },
  target: "electron-main",
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|render/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.electron.json"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.electron.json" })
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build-electron")
  }
};
