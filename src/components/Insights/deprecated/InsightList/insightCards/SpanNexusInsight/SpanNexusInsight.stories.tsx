import { Meta, StoryObj } from "@storybook/react";
import { SpanNexusInsight } from ".";
import { mockedSpanNexusInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanNexusInsight> = {
  title: "Insights/deprecated/InsightList/insightCards/SpanNexusInsight",
  component: SpanNexusInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSpanNexusInsight
  }
};
