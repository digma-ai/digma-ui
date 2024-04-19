import { Meta, StoryObj } from "@storybook/react";
import { CreateEnvironmentPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CreateEnvironmentPanel> = {
  title: "Recent Activity/CreateEnvironmentPanel",
  component: CreateEnvironmentPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Local: Story = {
  args: {
    tabs: [
      { index: 1, name: "Environment Name", state: "completed" },
      { index: 2, name: "Register", state: "active" },
      { index: 3, name: "Environment Type", state: "not-completed" }
    ]
  }
};
