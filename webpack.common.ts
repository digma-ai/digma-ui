import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { WebpackEnv, entries } from "./webpackEntries";

const getConfig = (env: WebpackEnv): WebpackConfiguration => {
  const entriesToBuild = env.app
    ? { [env.app]: entries[env.app].entry }
    : Object.entries(entries).reduce((acc, [name, entry]) => {
        return {
          ...acc,
          [name]: entry.entry
        };
      }, {});

  return {
    entry: entriesToBuild,
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name]/index.js",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      ...(env.app ? [] : [new CleanWebpackPlugin()]),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./public")
          }
        ]
      }),
      ...Object.keys(entriesToBuild).map((entry) => {
        return new HtmlWebpackPlugin({
          template: path.resolve(
            __dirname,
            `./assets/${env.platform === "Web" ? "index.web.ejs" : "index.ejs"}`
          ),
          filename: `${entry}/index.html`,
          chunks: [entry],
          inject: false,
          minify: false,
          scriptLoading: "blocking",
          templateParameters: {
            environmentVariables: entries[entry]?.environmentVariables || []
          }
        });
      })
    ]
  };
};

export default getConfig;
