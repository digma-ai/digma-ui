import type { Meta, StoryObj } from "@storybook/react";
import { InsightHeader } from ".";
import { mockedEndpointSpanNPlusOneInsight } from "../../../EndpointSpanNPlusOneInsightInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightHeader> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/InsightHeader",
  component: InsightHeader,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointSpanNPlusOneInsight,
    isAsync: true
  }
};
