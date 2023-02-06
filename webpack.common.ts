import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";

const config: WebpackConfiguration = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
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
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./assets/index.ejs"),
      inject: false,
      scriptLoading: "blocking"
    })
  ]
};

export default config;
