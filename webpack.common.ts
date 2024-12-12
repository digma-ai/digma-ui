import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import ZipPlugin from "zip-webpack-plugin";
import { WebpackEnv, appData } from "./apps";
import packageJson from "./package.json";

interface PackageJson {
  version: string;
}

const getConfig = (env: WebpackEnv): WebpackConfiguration => {
  const entriesToBuild: Record<string, string> = Object.entries(appData)
    .filter(
      ([, entry]) => !env.platform || entry.platforms.includes(env.platform)
    )
    .reduce(
      (acc, [name, entry]) => ({
        ...acc,
        [name]: entry.entry
      }),
      {}
    );

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
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./public")
          },
          ...(env.platform === "JetBrains"
            ? [
                {
                  from: path.resolve(__dirname, `./jaeger-ui/dist`),
                  to: "jaeger-ui"
                }
              ]
            : [])
        ]
      }),
      ...Object.keys(entriesToBuild).map((app) => {
        return new HtmlWebpackPlugin({
          template: path.resolve(
            __dirname,
            `./assets/${env.platform === "Web" ? "index.web.ejs" : "index.ejs"}`
          ),
          filename: `${app}/index.html`,
          chunks: [app],
          inject: false,
          minify: false,
          scriptLoading: "blocking",
          templateParameters: {
            environmentVariables: appData[app]?.environmentVariables ?? []
          }
        });
      }),
      ...(env.compress
        ? [
            new ZipPlugin({
              filename: [
                "dist",
                (env.platform ?? "").toLocaleLowerCase(),
                `v${(packageJson as PackageJson).version}.zip`
              ]
                .filter(Boolean)
                .join("-")
            })
          ]
        : [])
    ]
  };
};

export default getConfig;
