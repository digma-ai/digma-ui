import { Meta, StoryObj } from "@storybook/react";

import { EmptyStateCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EmptyStateCard> = {
  title: "Highlights/EmptyStateCard",
  component: EmptyStateCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const WaitingForData: Story = {
  args: {
    type: "loading",
    text: "Detected issues will appear here"
  }
};

export const NoData: Story = {
  args: {
    type: "noData",
    text: "No Issues available at the moment"
  }
};
