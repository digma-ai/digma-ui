import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointQueryOptimizationV2InsightTicket } from ".";
import { mockedEndpointQueryOptimizationV2Insight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointQueryOptimizationV2InsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationV2InsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/EndpointQueryOptimizationV2InsightTicket",
  component: EndpointQueryOptimizationV2InsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointQueryOptimizationV2InsightTicket>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedEndpointQueryOptimizationV2Insight
    }
  }
};
