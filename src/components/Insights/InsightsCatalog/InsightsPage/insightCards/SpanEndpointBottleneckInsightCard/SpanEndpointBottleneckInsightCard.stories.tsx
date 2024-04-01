import { Meta, StoryObj } from "@storybook/react";
import { SpanEndpointBottleneckInsightCard } from ".";
import { mockedSpanEndpointBottleneckInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanEndpointBottleneckInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/SpanEndpointBottleneckInsightCard",
  component: SpanEndpointBottleneckInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSpanEndpointBottleneckInsight
  }
};

export const WithoutEndpoints: Story = {
  args: {
    insight: {
      ...mockedSpanEndpointBottleneckInsight,
      slowEndpoints: []
    }
  }
};
