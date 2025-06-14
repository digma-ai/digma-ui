import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointSpanNPlusOneInsightCard } from ".";
import { mockedEndpointSpanNPlusOneInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSpanNPlusOneInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointSpanNPlusOneInsightCard",
  component: EndpointSpanNPlusOneInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointSpanNPlusOneInsightCard>;

export const Default: Story = {
  args: {
    insight: mockedEndpointSpanNPlusOneInsight
  }
};

export const RepeatedQuery: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      subType: "repeatedQueries"
    }
  }
};

export const RepeatedInserts: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      subType: "repeatedInserts"
    }
  }
};
