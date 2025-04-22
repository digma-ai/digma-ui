import type { Meta, StoryObj } from "@storybook/react";
import { EndpointChattyApiV2HighlightCard } from ".";
import { mockedEndpointChattyApiV2HighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointChattyApiV2HighlightCard> = {
  title: "Highlights/TopIssues/highlightCards/EndpointChattyApiV2HighlightCard",
  component: EndpointChattyApiV2HighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointChattyApiV2HighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointChattyApiV2HighlightData
  }
};
