import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { HistoryNavigationPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HistoryNavigationPanel> = {
  title: "common/HistoryNavigationPanel",
  component: HistoryNavigationPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof HistoryNavigationPanel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    canGoBack: true,
    canGoForward: true
  }
};

export const Head: Story = {
  args: {
    canGoBack: false,
    canGoForward: true
  }
};

export const Tail: Story = {
  args: {
    canGoBack: true,
    canGoForward: false
  }
};

export const Disabled: Story = {
  args: {
    canGoBack: false,
    canGoForward: false
  }
};
