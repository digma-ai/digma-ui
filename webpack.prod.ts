import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const config = merge(commonConfig, {
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
