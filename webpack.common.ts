import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";

const entries = {
  assets: path.resolve(__dirname, "./src/containers/Assets/index.tsx"),
  documentation: path.resolve(
    __dirname,
    "./src/containers/Documentation/index.tsx"
  ),
  insights: path.resolve(__dirname, "./src/containers/Insights/index.tsx"),
  installationWizard: path.resolve(
    __dirname,
    "./src/containers/InstallationWizard/index.tsx"
  ),
  notifications: path.resolve(
    __dirname,
    "./src/containers/Notifications/index.tsx"
  ),
  recentActivity: path.resolve(
    __dirname,
    "./src/containers/RecentActivity/index.tsx"
  ),
  troubleshooting: path.resolve(
    __dirname,
    "./src/containers/Troubleshooting/index.tsx"
  )
};

const config: WebpackConfiguration = {
  entry: entries,
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public")
        }
      ]
    }),
    ...Object.keys(entries).map(
      (entry) =>
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `./assets/${entry}/index.ejs`),
          filename: `${entry}/index.html`,
          chunks: [entry],
          inject: false,
          minify: false,
          scriptLoading: "blocking"
        })
    )
  ]
};

export default config;
