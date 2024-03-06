const path = require("path");

let env = process.env.NODE_ENV || "development";
let plugins = [];
if (env !== "production") {
  require("dotenv").config();
  const Dotenv = require("dotenv-webpack");
  plugins.push(new Dotenv({ systemvars: true }));
}

module.exports = {
  entry: "./client/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  mode: env,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: plugins,
};
