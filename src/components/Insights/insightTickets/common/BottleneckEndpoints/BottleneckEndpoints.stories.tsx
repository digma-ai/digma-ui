import { Meta, StoryObj } from "@storybook/react";
import { BottleneckEndpoints } from ".";
import { mockedSpanEndpointBottleneckInsight } from "../../../InsightsCatalog/InsightsPage/insightCards/SpanEndpointBottleneckInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BottleneckEndpoints> = {
  title: "Insights/insightTickets/common/BottleneckEndpoints",
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
