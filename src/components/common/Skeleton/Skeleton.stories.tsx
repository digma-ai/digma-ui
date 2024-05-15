import { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Skeleton> = {
  title: "Common/Skeleton",
  component: Skeleton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Rectangle: Story = {
  args: {
    type: "rectangle"
  }
};

export const Circle: Story = {
  args: {
    type: "circle"
  }
};

export const Text: Story = {
  args: {
    type: "text"
  }
};
