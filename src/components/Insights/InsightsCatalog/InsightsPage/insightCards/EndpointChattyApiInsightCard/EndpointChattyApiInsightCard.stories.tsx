import { Meta, StoryObj } from "@storybook/react";
import { EndpointChattyApiInsightCard } from ".";
import { mockedEndpointChattyApiInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointChattyApiInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/EndpointChattyApiInsightCard",
  component: EndpointChattyApiInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointChattyApiInsight
  }
};

export const WithMultipleSpans: Story = {
  args: {
    insight: {
      ...mockedEndpointChattyApiInsight,
      spans: new Array(4).fill(undefined).map((x, i) => ({
        ...mockedEndpointChattyApiInsight.spans[0],
        clientSpan: {
          ...mockedEndpointChattyApiInsight.spans[0].clientSpan,
          spanCodeObjectId: `${mockedEndpointChattyApiInsight.spans[0].clientSpan.spanCodeObjectId} ${i}`
        }
      }))
    }
  }
};
