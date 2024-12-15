import type { Meta, StoryObj } from "@storybook/react";
import { EndpointHighNumberOfQueriesInsightCard } from ".";
import { mockedEndpointHighNumberOfQueriesInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointHighNumberOfQueriesInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/HighNumberOfQueriesInsightCard",
  component: EndpointHighNumberOfQueriesInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointHighNumberOfQueriesInsight
  }
};

export const AffectingSlowest5Percent: Story = {
  name: "Affecting Slowest 5%",
  args: {
    insight: { ...mockedEndpointHighNumberOfQueriesInsight, quantile: 0.95 }
  }
};
