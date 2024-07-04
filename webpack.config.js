/* eslint-disable @typescript-eslint/no-var-requires */
// Generated using webpack-cli https://github.com/webpack/webpack-cli
const proconfig = require("./webpack.pro.config.js")
const watchconfig = require("./webpack.watch.config.js")
const { merge } = require("webpack-merge")
const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const comconfig = {
  entry: {
    background: "./src/background.tsx",
    content: "./src/content.ts",
    inject: "./src/inject.ts",
    popup: "./src/popup/index.tsx",
    options: "./src/options/index.tsx",
  },
  output: {
    filename: pathData => {
      return pathData.chunk.name === "background" ? "./[name].js" : "./js/[name].js"
    },
    path: path.resolve(__dirname, "xzz2021"),
    // clean: true, // Clean the output directory before emit.
    compareBeforeEmit: true, // 只覆写内容变化的文件
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  stats: {
    orphanModules: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 可以实现自动生成新的html并自动导入js
      template: "./src/popup/index.html",
      filename: "popup.html",
      chunks: ["popup"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      // 可以实现自动生成新的html并自动导入js
      template: "./src/options/index.html",
      filename: "options.html",
      chunks: ["options"],
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/logo.png", to: "./logo.png" },
        { from: "public/manifest.json", to: "./manifest.json" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/i,
            exclude: /node_modules/,
            loader: "babel-loader", //调用babelcore把源代码转换成抽象语法树,解析遍历生成,
            options: {
              cacheDirectory: true,
              presets: [
                ["@babel/preset-env", { modules: false }],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: "asset/inline",
            // use: 'url-loader?limit=16941'
          },
          {
            test: /\.(ts|tsx)$/i,
            exclude: /node_modules/,
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
}

module.exports = env => {
  if (env.WEBPACK_WATCH) {
    return merge(comconfig, watchconfig)
  } else {
    return merge(comconfig, proconfig)
  }
}
