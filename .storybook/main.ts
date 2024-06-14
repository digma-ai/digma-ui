import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-designs"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      strictMode: true
    }
  },
  core: {
    disableTelemetry: true
  },
  staticDirs: ["../public"],
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript"
  }
};

export default config;
