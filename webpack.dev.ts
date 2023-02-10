import path from "path";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const styledComponentsTransformer = createStyledComponentsTransformer();

const config = merge<
  WebpackConfiguration & { devServer?: WebpackDevServerConfiguration }
>(commonConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./public")
    },
    port: 3000,
    historyApiFallback: true
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
