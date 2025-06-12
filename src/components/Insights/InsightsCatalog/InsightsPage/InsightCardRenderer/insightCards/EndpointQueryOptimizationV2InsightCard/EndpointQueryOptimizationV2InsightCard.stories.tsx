import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointQueryOptimizationV2InsightCard } from ".";
import { mockedEndpointQueryOptimizationV2Insight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationV2InsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointQueryOptimizationV2InsightCard",
  component: EndpointQueryOptimizationV2InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointQueryOptimizationV2InsightCard>;

export const Default: Story = {
  args: {
    insight: mockedEndpointQueryOptimizationV2Insight
  }
};
