/* eslint-disable @typescript-eslint/no-var-requires */

const { wsAutoReloadPlugin } = require("ws-reload-plugin")
const webpack = require("webpack")

const watchconfig = {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    new wsAutoReloadPlugin(),
    //可以定义全局上下文的变量
    new webpack.DefinePlugin({
      AUTHOR: JSON.stringify("xzz2021"),
      DEBUG: true,
      __REACT_DEVTOOLS_GLOBAL_HOOK__: { isDisabled: true },
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
}

module.exports = watchconfig
