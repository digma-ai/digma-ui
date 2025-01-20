import type { Meta, StoryObj } from "@storybook/react";
import { SlowEndpointInsightCard } from ".";
import { mockedSlowEndpointInsight } from "./mockData";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SlowEndpointInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SlowEndpointInsightCard",
  component: SlowEndpointInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSlowEndpointInsight
  }
};
