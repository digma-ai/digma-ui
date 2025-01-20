import type { Meta, StoryObj } from "@storybook/react";
import { EndpointSpanNPlusOneInsightTicket } from ".";
import { mockedEndpointSpanNPlusOneInsight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointSpanNPlusOneInsightInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSpanNPlusOneInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/EndpointSpanNPlusOneInsightTicket",
  component: EndpointSpanNPlusOneInsightTicket,
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
      insight: mockedEndpointSpanNPlusOneInsight
    }
  }
};
