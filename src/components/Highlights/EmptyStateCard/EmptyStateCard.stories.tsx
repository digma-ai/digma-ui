import type { Meta, StoryObj } from "@storybook/react";
import { EmptyStateCard } from ".";
import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";

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

type Story = StoryObj<typeof EmptyStateCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const WaitingForData: Story = {
  args: {
    type: "lowSeverity",
    icon: RefreshIcon,
    text: "Detected issues will appear here"
  }
};

export const NoData: Story = {
  args: {
    icon: CrossCircleIcon,
    text: "No Issues available at the moment"
  }
};
