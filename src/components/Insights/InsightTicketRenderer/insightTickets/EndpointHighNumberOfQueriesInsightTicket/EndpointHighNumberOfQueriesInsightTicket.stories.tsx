import type { Meta, StoryObj } from "@storybook/react";
import { EndpointHighNumberOfQueriesInsightTicket } from ".";
import { mockedEndpointHighNumberOfQueriesInsight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointHighNumberOfQueriesInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointHighNumberOfQueriesInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/EndpointHighNumberOfQueriesInsightTicket",
  component: EndpointHighNumberOfQueriesInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointHighNumberOfQueriesInsightTicket>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedEndpointHighNumberOfQueriesInsight
    }
  }
};
