import { Meta, StoryObj } from "@storybook/react";
import { ErrorsPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorsPanel> = {
  title: "Recent Activity/CreateEnvironmentPanel/ErrorsPanel",
  component: ErrorsPanel,
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
    errors: [
      {
        id: "test",
        title: "Incorrect name",
        description: "Please use a valid name for your environment."
      }
    ]
  }
};
