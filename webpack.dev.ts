import path from "path";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const styledComponentsTransformer = createStyledComponentsTransformer();

const config = merge(commonConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist")
    },
    port: 3000
    // historyApiFallback: true
  },
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
