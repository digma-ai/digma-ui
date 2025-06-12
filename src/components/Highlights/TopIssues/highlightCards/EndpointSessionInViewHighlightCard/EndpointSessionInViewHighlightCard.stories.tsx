import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointSessionInViewHighlightCard } from ".";
import { mockedEndpointSessionInViewHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSessionInViewHighlightCard> = {
  title:
    "Highlights/TopIssues/highlightCards/EndpointSessionInViewHighlightCard",
  component: EndpointSessionInViewHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointSessionInViewHighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointSessionInViewHighlightData
  }
};
