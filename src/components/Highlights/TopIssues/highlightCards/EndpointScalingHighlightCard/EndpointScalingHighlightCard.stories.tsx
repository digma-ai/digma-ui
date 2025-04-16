import type { Meta, StoryObj } from "@storybook/react";
import { EndpointScalingHighlightCard } from ".";
import { mockedEndpointScalingHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointScalingHighlightCard> = {
  title: "Highlights/TopIssues/highlightCards/EndpointScalingHighlightCard",
  component: EndpointScalingHighlightCard,
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
    data: mockedEndpointScalingHighlightData
  }
};
