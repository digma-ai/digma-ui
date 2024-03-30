import { Meta, StoryObj } from "@storybook/react";
import { QueryOptimizationInsight } from ".";
import { mockedQueryOptimizationInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof QueryOptimizationInsight> = {
  title:
    "Insights/deprecated/InsightList/insightCards/QueryOptimizationInsight",
  component: QueryOptimizationInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedQueryOptimizationInsight
  }
};

export const LinkedJira: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      ticketLink: "https://digma.ai/1"
    }
  }
};
