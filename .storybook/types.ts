import { StorybookConfig } from "@storybook/core-common";

interface BabelConfig {
  plugins: (string | [string, Record<string, unknown>])[];
}

export interface ExtendedStorybookConfig extends StorybookConfig {
  babel: (options: BabelConfig) => BabelConfig;
}
