import { Meta, StoryObj } from "@storybook/react";
import { EnvironmentTypePanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentTypePanel> = {
  title: "Recent Activity/EnvironmentTypePanel",
  component: EnvironmentTypePanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    environment: {
      originalName: "environmentName",
      hasRecentActivity: false,
      name: "environmentName",
      isPending: true,
      additionToConfigResult: null,
      type: null,
      token: null,
      serverApiUrl: null,
      isOrgDigmaSetupFinished: false
    }
  }
};
