import type { Meta, StoryObj } from "@storybook/react";
import { SpanPerformanceAnomalyInsightTicket } from ".";
import { mockedSpanPerformanceAnomalyInsight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanPerformanceAnomalyInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanPerformanceAnomalyInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/SpanPerformanceAnomalyInsightTicket",
  component: SpanPerformanceAnomalyInsightTicket,
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
      insight: mockedSpanPerformanceAnomalyInsight
    }
  }
};
