import type { Meta, StoryObj } from "@storybook/react";
import { SpanQueryOptimizationHighlightCard } from ".";
import { mockedSpanQueryOptimizationHighlightData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanQueryOptimizationHighlightCard> = {
  title:
    "Highlights/TopIssues/highlightCards/SpanQueryOptimizationHighlightCard",
  component: SpanQueryOptimizationHighlightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SpanQueryOptimizationHighlightCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: mockedSpanQueryOptimizationHighlightData
  }
};
