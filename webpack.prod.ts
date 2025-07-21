import path from "path";
import type { Configuration } from "webpack";

const config: Configuration = {
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
