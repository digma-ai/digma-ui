import { ExtendedStorybookConfig } from "./types";

const config: ExtendedStorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    disableTelemetry: true,
    builder: "webpack5"
  },
  staticDirs: ["../public"],
  typescript: {
    check: true
  },
  babel: (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      [
        "babel-plugin-styled-components",
        {
          fileName: false
        }
      ]
    ]
  })
};

export default config;
