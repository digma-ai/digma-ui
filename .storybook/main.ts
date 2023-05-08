import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true,
      strictMode: true
    }
  },
  core: {
    disableTelemetry: true
  },
  staticDirs: ["../public"],
  typescript: {
    check: true
  },
  docs: {
    autodocs: "tag"
  }
};

export default config;
