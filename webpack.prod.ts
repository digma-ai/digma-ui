import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { customizeArray, mergeWithCustomize } from "webpack-merge";
import commonConfig from "./webpack.common";

const config = mergeWithCustomize({
  customizeArray: customizeArray({ plugins: "prepend" })
})(commonConfig, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
});

export default config;
