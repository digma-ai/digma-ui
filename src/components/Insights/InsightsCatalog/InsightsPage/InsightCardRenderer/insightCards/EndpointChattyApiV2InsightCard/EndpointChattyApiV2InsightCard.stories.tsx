import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointChattyApiV2InsightCard } from ".";
import { mockedEndpointChattyApiV2Insight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointChattyApiV2InsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointChattyApiV2InsightCard",
  component: EndpointChattyApiV2InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointChattyApiV2InsightCard>;

export const Default: Story = {
  args: {
    insight: mockedEndpointChattyApiV2Insight
  }
};
