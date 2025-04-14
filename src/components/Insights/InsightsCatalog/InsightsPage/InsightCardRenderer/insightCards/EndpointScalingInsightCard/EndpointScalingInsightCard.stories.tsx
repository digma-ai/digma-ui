import type { Meta, StoryObj } from "@storybook/react";
import { EndpointScalingInsightCard } from ".";
import {
  mockedEndpointScalingInsight,
  mockedEndpointScalingWithRootCauseInsight,
  mockedEndpointScalingWithSpanInsight
} from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointScalingInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointScalingInsightCard",
  component: EndpointScalingInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointScalingInsight
  }
};

export const WithSpan: Story = {
  args: {
    insight: mockedEndpointScalingWithSpanInsight
  }
};

export const WithRootCause: Story = {
  args: {
    insight: mockedEndpointScalingWithRootCauseInsight
  }
};
