import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointQueryOptimizationV2HighlightCard } from ".";
import { mockedEndpointQueryHighLightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationV2HighlightCard> = {
  title:
    "Highlights/TopIssues/highlightCards/EndpointQueryOptimizationV2HighlightCard",
  component: EndpointQueryOptimizationV2HighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointQueryOptimizationV2HighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedEndpointQueryHighLightData
  }
};
