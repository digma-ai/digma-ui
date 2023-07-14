import { Meta, StoryObj } from "@storybook/react";

import { AutomaticInstaller } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AutomaticInstaller> = {
  title: "Installation Wizard/AutomaticInstaller",
  component: AutomaticInstaller,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
