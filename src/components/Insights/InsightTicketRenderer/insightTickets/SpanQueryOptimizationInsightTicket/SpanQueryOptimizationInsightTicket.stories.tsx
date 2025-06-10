import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SpanQueryOptimizationInsightTicket } from ".";
import { mockedSpanQueryOptimizationInsight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanQueryOptimizationInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanQueryOptimizationInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/SpanQueryOptimizationInsightTicket",
  component: SpanQueryOptimizationInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SpanQueryOptimizationInsightTicket>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedSpanQueryOptimizationInsight
    }
  }
};
