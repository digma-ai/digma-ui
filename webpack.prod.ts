import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";

const config: WebpackConfiguration = {
  extends: path.resolve(__dirname, "./webpack.common.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  }
};

export default config;
