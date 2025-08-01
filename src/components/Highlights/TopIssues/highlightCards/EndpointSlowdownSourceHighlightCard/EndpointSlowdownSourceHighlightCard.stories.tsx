import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointSlowdownSourceHighlightCard } from ".";
import { mockedEndpointSlowdownSourceHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointSlowdownSourceHighlightCard> = {
  title:
    "Highlights/TopIssues/highlightCards/EndpointSlowdownSourceHighlightCard",
  component: EndpointSlowdownSourceHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointSlowdownSourceHighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointSlowdownSourceHighlightData
  }
};
