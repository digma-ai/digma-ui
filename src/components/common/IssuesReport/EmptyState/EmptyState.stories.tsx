import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EmptyState } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EmptyState> = {
  title: "common/IssuesReport/EmptyState",
  component: EmptyState,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NoData: Story = {
  args: {
    preset: "noData"
  }
};

export const NoEndpoints: Story = {
  args: {
    preset: "noEndpoints"
  }
};

export const NoServices: Story = {
  args: {
    preset: "noServices"
  }
};

export const Loading: Story = {
  args: {
    preset: "loading"
  }
};
