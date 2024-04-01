import { Meta, StoryObj } from "@storybook/react";
import { SpanEndpointBottleneckInsightTicket } from ".";
import { mockedSpanEndpointBottleneckInsight } from "../../InsightsCatalog/InsightsPage/insightCards/SpanEndpointBottleneckInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanEndpointBottleneckInsightTicket> = {
  title: "Insights/insightTickets/SpanEndpointBottleneckInsightTicket",
  component: SpanEndpointBottleneckInsightTicket,
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
      insight: mockedSpanEndpointBottleneckInsight
    }
  }
};
