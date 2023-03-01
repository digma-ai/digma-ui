import { Configuration as WebpackConfiguration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const config: WebpackConfiguration = merge(commonConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  }
});

export default config;
