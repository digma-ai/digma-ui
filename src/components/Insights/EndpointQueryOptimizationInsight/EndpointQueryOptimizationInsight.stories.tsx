import { Meta, StoryObj } from "@storybook/react";
import { EndpointQueryOptimizationInsight } from ".";
import { mockedEndpointQueryOptimizationInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationInsight> = {
  title: "Insights/EndpointQueryOptimizationInsight",
  component: EndpointQueryOptimizationInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointQueryOptimizationInsight
  }
};
