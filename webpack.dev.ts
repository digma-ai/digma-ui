import path from "path";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";
import { Configuration as WebpackConfiguration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const styledComponentsTransformer = createStyledComponentsTransformer();

const config: WebpackConfiguration = merge(commonConfig, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.dev.json"),
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer]
          })
        }
      }
    ]
  }
});

export default config;
