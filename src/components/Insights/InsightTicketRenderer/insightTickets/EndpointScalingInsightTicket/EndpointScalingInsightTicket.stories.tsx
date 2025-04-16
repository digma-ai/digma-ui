import type { Meta, StoryObj } from "@storybook/react";
import { EndpointScalingInsightTicket } from ".";
import { mockedEndpointScalingInsight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointScalingInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointScalingInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/EndpointScalingInsightTicket",
  component: EndpointScalingInsightTicket,
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
      insight: mockedEndpointScalingInsight
    }
  }
};
