import type { Meta, StoryObj } from "@storybook/react";
import { EndpointBottleneckInsightTicket } from ".";
import { mockedEndpointBottleneckInsight } from "../../InsightsCatalog/InsightsPage/insightCards/EndpointBottleneckInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointBottleneckInsightTicket> = {
  title: "Insights/insightTickets/EndpointBottleneckInsightTicket",
  component: EndpointBottleneckInsightTicket,
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
      insight: mockedEndpointBottleneckInsight
    }
  }
};
