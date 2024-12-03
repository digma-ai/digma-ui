import { Configuration as WebpackConfiguration } from "webpack";
import { merge } from "webpack-merge";
import { WebpackEnv } from "./apps";
import commonConfig from "./webpack.common";

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
