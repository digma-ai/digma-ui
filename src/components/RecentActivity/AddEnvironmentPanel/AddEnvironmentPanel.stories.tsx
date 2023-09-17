import { Meta, StoryObj } from "@storybook/react";
import { AddEnvironmentPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AddEnvironmentPanel> = {
  title: "Recent Activity/AddEnvironmentPanel",
  component: AddEnvironmentPanel,
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
      name: "ENVIRONMENT_NAME",
      isPending: true,
      hasRecentActivity: false,
      additionToConfigResult: null,
      type: "local"
    }
  }
};
