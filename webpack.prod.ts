import { Configuration as WebpackConfiguration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";
import { WebpackEnv } from "./webpackEntries";

const getConfig = (env: WebpackEnv): WebpackConfiguration =>
  merge(commonConfig(env), {
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

export default getConfig;
