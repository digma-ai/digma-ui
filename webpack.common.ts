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

const getZipFilename = (env: WebpackEnv): string => {
  const ZIP_NAME_FORMATS: Record<string, string> = {
    default: "dist-{platform}-v{version}",
    JetBrains: "digma-ui-{version}"
  };

  const argFormat = env["zip-filename-format"];
  const format =
    (argFormat && ZIP_NAME_FORMATS[argFormat]) ?? ZIP_NAME_FORMATS.default;

  return format
    .replace("{platform}", (env.platform ?? "").toLocaleLowerCase())
    .replace("{version}", (packageJson as PackageJson).version)
    .replace(/-{2,}/g, "-");
};

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
              filename: getZipFilename(env)
            })
          ]
        : [])
    ]
  };
};

export default getConfig;
