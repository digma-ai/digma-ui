import * as cheerio from "cheerio";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import type { Configuration as WebpackConfiguration } from "webpack";
import ZipPlugin from "zip-webpack-plugin";
import type { WebpackEnv } from "./apps";
import { appData } from "./apps";
import packageJson from "./package.json";

interface PackageJson {
  version: string;
}

const getZipFilename = (env: WebpackEnv): string => {
  const ZIP_NAME_FORMATS: Record<string, string> = {
    default: "dist-{platform}-v{version}",
    JetBrains: "digma-ui-{version}"
  };

  const argFormat = env.ZIP_FILE_FORMAT;
  const format =
    (argFormat && ZIP_NAME_FORMATS[argFormat]) ?? ZIP_NAME_FORMATS.default;

  return format
    .replace("{platform}", env.PLATFORM ?? "")
    .replace("{version}", (packageJson as PackageJson).version)
    .replace(/-{2,}/g, "-");
};

const getConfig = (env: WebpackEnv): WebpackConfiguration => {
  const entriesToBuild: Record<string, string> = Object.entries(appData)
    .filter(
      ([, entry]) => !env.PLATFORM || entry.platforms.includes(env.PLATFORM)
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
      filename: "[name]/index.[contenthash].js",
      publicPath: ""
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
          ...(env.PLATFORM && ["jetbrains", "vs"].includes(env.PLATFORM)
            ? [
                {
                  from: path.resolve(__dirname, `./jaeger-ui/dist/static`),
                  to: "jaeger-ui/static"
                },
                {
                  from: path.resolve(__dirname, `./jaeger-ui/dist/index.html`),
                  to: "jaeger-ui/index.html",
                  transform(content: Buffer) {
                    const BASE_URL = "/jaeger-ui/";
                    const $ = cheerio.load(content.toString());
                    $('base[data-inject-target="BASE_URL"]').attr(
                      "href",
                      BASE_URL
                    );
                    $("head").append('<script src="./env.js"></script>');
                    return Buffer.from($.html());
                  }
                }
              ]
            : [])
        ]
      }),
      ...Object.keys(entriesToBuild).map((app) => {
        return new HtmlWebpackPlugin({
          template: path.resolve(
            __dirname,
            `./assets/${env.PLATFORM === "web" ? "index.web.ejs" : "index.ejs"}`
          ),
          filename: `${app}/index.html`,
          chunks: [app],
          inject: false,
          minify: false,
          scriptLoading: "blocking",
          templateParameters: (compilation, assets, assetTags, options) => ({
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options
            },
            version: (packageJson as PackageJson).version,
            jsAssets: assets.js.map((js) => path.basename(js)),
            baseUrl: `/${app}/`
          })
        });
      }),
      ...(env.ZIP
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
