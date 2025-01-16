import type { Meta, StoryObj } from "@storybook/react";
import { BottleneckEndpoints } from ".";
import { mockedSpanEndpointBottleneckInsight } from "../../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanEndpointBottleneckInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BottleneckEndpoints> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/common/BottleneckEndpoints",
  component: BottleneckEndpoints,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: {
      ...mockedSpanEndpointBottleneckInsight
    }
  }
};

export const WithoutInsight: Story = {};

export const WithNoSlowEndpoints: Story = {
  args: {
    insight: {
      ...mockedSpanEndpointBottleneckInsight,
      slowEndpoints: []
    }
  }
};
