import { Meta, StoryObj } from "@storybook/react";

import { EndpointBottleneckHighlightCard } from ".";
import { mockedEndpointBottleneckHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointBottleneckHighlightCard> = {
  title: "Highlights/TopIssues/highlightCards/EndpointBottleneckHighlightCard",
  component: EndpointBottleneckHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointBottleneckHighlightData
  }
};
