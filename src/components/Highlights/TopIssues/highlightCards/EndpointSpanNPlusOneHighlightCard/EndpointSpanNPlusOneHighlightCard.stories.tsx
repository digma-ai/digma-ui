import type { Meta, StoryObj } from "@storybook/react";
import { EndpointSpanNPlusOneHighlightCard } from ".";
import { mockedEndpointSpanNPlusOneHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSpanNPlusOneHighlightCard> = {
  title:
    "Highlights/TopIssues/highlightCards/EndpointSpanNPlusOneHighlightCard",
  component: EndpointSpanNPlusOneHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointSpanNPlusOneHighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointSpanNPlusOneHighlightData
  }
};
