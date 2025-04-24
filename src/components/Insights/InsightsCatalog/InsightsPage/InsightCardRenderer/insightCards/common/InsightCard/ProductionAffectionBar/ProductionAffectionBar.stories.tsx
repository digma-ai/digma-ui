import type { Meta, StoryObj } from "@storybook/react";
import { ProductionAffectionBar } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProductionAffectionBar> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/ProductionAffectionBar",
  component: ProductionAffectionBar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof ProductionAffectionBar>;

export const WithoutTicket: Story = {};

export const WithTicket: Story = {
  args: {
    isTicketCreated: true
  }
};

export const WithDisabledTicketCreation: Story = {
  args: {
    onCreateTicket: undefined
  }
};
