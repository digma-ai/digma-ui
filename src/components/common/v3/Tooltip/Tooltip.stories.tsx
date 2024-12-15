import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tooltip> = {
  title: "common/v3/Tooltip",
  component: Tooltip,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Hover me</span>,
    title: "Tooltip title"
  }
};
