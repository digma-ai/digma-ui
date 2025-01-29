import type { Meta, StoryObj } from "@storybook/react";
import { SpanPerformanceAnomalyInsightCard } from ".";
import { mockedSpanPerformanceAnomalyInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanPerformanceAnomalyInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanPerformanceAnomalyInsightCard",
  component: SpanPerformanceAnomalyInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSpanPerformanceAnomalyInsight
  }
};

export const WithoutTraces: Story = {
  args: {
    insight: {
      ...mockedSpanPerformanceAnomalyInsight,
      p50TraceId: null,
      p95TraceId: null
    }
  }
};
