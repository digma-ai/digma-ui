import { Meta, StoryObj } from "@storybook/react";
import { EndpointQueryOptimizationV2Insight } from ".";
import { mockedEndpointQueryOptimizationV2Insight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationV2Insight> = {
  title: "Insights/common/insights/EndpointQueryOptimizationV2Insight",
  component: EndpointQueryOptimizationV2Insight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointQueryOptimizationV2Insight
  }
};
