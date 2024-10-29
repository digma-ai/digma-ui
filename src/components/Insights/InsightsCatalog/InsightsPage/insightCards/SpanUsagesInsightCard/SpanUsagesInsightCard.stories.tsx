import { Meta, StoryObj } from "@storybook/react";
import { SpanUsagesInsightCard } from ".";
import { mockedSpanUsagesInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanUsagesInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/SpanUsagesInsightCard",
  component: SpanUsagesInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSpanUsagesInsight
  }
};

export const WithoutUsage: Story = {
  args: {
    insight: {
      ...mockedSpanUsagesInsight,
      sampleTrace: "sampleTraceId",
      flows: [],
      isRecalculateEnabled: false
    }
  }
};

export const WithSmallUsage: Story = {
  args: {
    insight: {
      ...mockedSpanUsagesInsight,
      sampleTrace: "sampleTraceId",
      flows: [
        mockedSpanUsagesInsight.flows[0],
        mockedSpanUsagesInsight.flows[1],
        { ...mockedSpanUsagesInsight.flows[2], percentage: 0.001 }
      ],
      isRecalculateEnabled: false
    }
  }
};
