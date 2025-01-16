import type { Meta, StoryObj } from "@storybook/react";
import { SpaNPlusOneInsightTicket } from ".";
import { mockedSpaNPlusOneInsight } from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpaNPlusOneInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpaNPlusOneInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/SpaNPlusOneInsightTicket",
  component: SpaNPlusOneInsightTicket,
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
      insight: mockedSpaNPlusOneInsight
    }
  }
};
