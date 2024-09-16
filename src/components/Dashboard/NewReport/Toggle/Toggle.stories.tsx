import { Meta, StoryObj } from "@storybook/react";

import { Toggle } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Toggle> = {
  title: "Dashboard/NewReport/Toggle",
  component: Toggle,
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
    options: [
      { value: "Baseline", label: "Baseline" },
      { value: "Changes", label: "Changes" }
    ],
    value: "Baseline"
  }
};
