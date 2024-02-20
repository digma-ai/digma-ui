import { Meta, StoryObj } from "@storybook/react";
import { ScalingIssueInsight } from ".";
import { mockedSpanScalingInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScalingIssueInsight> = {
  title: "Insights/ScalingIssueInsight",
  component: ScalingIssueInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;



export const Default: Story = {
  args: {
    insight: mockedSpanScalingInsight
  }
};
