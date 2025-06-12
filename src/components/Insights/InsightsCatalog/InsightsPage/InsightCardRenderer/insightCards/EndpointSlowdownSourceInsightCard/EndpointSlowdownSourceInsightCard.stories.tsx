import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointSlowdownSourceInsightCard } from ".";
import { mockedEndpointSlowdownSourceInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSlowdownSourceInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointSlowdownSourceInsightCard",
  component: EndpointSlowdownSourceInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointSlowdownSourceInsightCard>;

export const Default: Story = {
  args: {
    insight: mockedEndpointSlowdownSourceInsight
  }
};
