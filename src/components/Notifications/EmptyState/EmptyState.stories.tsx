import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EmptyState> = {
  title: "Notifications/EmptyState",
  component: EmptyState,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NoData: Story = {
  args: {
    preset: "noData"
  }
};

export const NoUnreadData: Story = {
  args: {
    preset: "noUnreadData"
  }
};

export const Loading: Story = {
  args: {
    preset: "loading"
  }
};

export const Error: Story = {
  args: {
    preset: "error"
  }
};
