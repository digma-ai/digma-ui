import { Meta, StoryObj } from "@storybook/react";
import { SpanBottleneckInsight } from ".";
import { mockedSpanBottleneckInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanBottleneckInsight> = {
  title: "Insights/deprecated/InsightList/insightCards/SpanBottleneckInsight",
  component: SpanBottleneckInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSpanBottleneckInsight
  }
};
