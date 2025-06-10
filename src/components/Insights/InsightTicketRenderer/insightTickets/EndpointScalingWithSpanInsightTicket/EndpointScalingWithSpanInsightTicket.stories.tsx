import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointScalingWithSpanInsightTicket } from ".";
import {
  mockedEndpointScalingWithRootCauseInsight,
  mockedEndpointScalingWithSpanInsight
} from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointScalingInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointScalingWithSpanInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/EndpointScalingWithSpanInsightTicket",
  component: EndpointScalingWithSpanInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointScalingWithSpanInsightTicket>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedEndpointScalingWithSpanInsight
    }
  }
};

export const WithRootCause: Story = {
  args: {
    data: {
      insight: mockedEndpointScalingWithRootCauseInsight
    }
  }
};
