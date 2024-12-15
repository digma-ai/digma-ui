import type { Meta, StoryObj } from "@storybook/react";
import { SpanQueryOptimizationInsightTicket } from ".";
import { mockedSpanQueryOptimizationInsight } from "../../InsightsCatalog/InsightsPage/insightCards/SpanQueryOptimizationInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanQueryOptimizationInsightTicket> = {
  title: "Insights/insightTickets/SpanQueryOptimizationInsightTicket",
  component: SpanQueryOptimizationInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedSpanQueryOptimizationInsight
    }
  }
};
