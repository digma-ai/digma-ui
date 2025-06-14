import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AssetsViewScopeConfiguration } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetsViewScopeConfiguration> = {
  title: "Assets/AssetsViewConfiguration",
  component: AssetsViewScopeConfiguration,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof AssetsViewScopeConfiguration>;

export const Default: Story = {
  args: {
    assetsCount: 1
  }
};
