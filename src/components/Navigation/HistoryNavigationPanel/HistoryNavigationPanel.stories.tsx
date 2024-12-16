import type { Meta, StoryObj } from "@storybook/react";

import { HistoryNavigationPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HistoryNavigationPanel> = {
  title: "Navigation/HistoryNavigationPanel",
  component: HistoryNavigationPanel,
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
    isBackDisabled: false,
    isForwardDisabled: false
  }
};

export const Head: Story = {
  args: {
    isBackDisabled: true,
    isForwardDisabled: false
  }
};

export const Tail: Story = {
  args: {
    isBackDisabled: false,
    isForwardDisabled: true
  }
};

export const Disabled: Story = {
  args: {
    isBackDisabled: false,
    isForwardDisabled: false
  }
};
