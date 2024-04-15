import { Meta, StoryObj } from "@storybook/react";

import { EnvironmentBar } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentBar> = {
  title: "Navigation/EnvironmentBar",
  component: EnvironmentBar,
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
    selectedEnvironment: {
      id: "DEV",
      name: "DEV",
      type: "Private"
    }
  }
};

export const Disabled: Story = {
  args: {}
};
