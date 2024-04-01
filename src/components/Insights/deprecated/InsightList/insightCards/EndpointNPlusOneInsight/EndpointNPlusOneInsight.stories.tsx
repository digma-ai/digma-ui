import { Meta, StoryObj } from "@storybook/react";
import { EndpointNPlusOneInsight } from ".";
import { mockedEndpointNPlusOneInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointNPlusOneInsight> = {
  title: "Insights/deprecated/InsightList/insightCards/EndpointNPlusOneInsight",
  component: EndpointNPlusOneInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointNPlusOneInsight
  }
};
