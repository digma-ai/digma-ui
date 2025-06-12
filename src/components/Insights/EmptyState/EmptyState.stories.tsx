import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EmptyState } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EmptyState> = {
  title: "Insights/EmptyState",
  component: EmptyState,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const NothingToShow: Story = {
  args: {
    preset: "nothingToShow"
  }
};

export const NoDataYet: Story = {
  args: {
    preset: "noDataYet"
  }
};

export const Loading: Story = {
  args: {
    preset: "loading"
  }
};

export const NoInsights: Story = {
  args: {
    preset: "noInsights"
  }
};

export const Processing: Story = {
  args: {
    preset: "processing"
  }
};

export const NoObservability: Story = {
  args: {
    preset: "noObservability"
  }
};
