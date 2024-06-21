import { Meta, StoryObj } from "@storybook/react";
import { EndpointSpanNPlusOneInsightCard } from ".";
import { mockedEndpointSpanNPlusOneInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSpanNPlusOneInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/EndpointSpanNPlusOneInsightCard",
  component: EndpointSpanNPlusOneInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

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
