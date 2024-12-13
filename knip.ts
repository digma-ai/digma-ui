import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "scripts/*.{js,mjs,mts,ts}",
    "src/containers/*/index.tsx",
    "webpack.*.ts"
  ],
  project: ["**/*.{js,mjs,mts,ts,tsx}"],
  ignore: ["src/**/deprecated/**/*.{ts,tsx}"],
  ignoreDependencies: [
    // used by webpack
    "babel-loader",
    "css-loader",
    "style-loader",
    "ts-loader",
    "ts-node",
    "webpack-cli"
  ]
};

export default config;
