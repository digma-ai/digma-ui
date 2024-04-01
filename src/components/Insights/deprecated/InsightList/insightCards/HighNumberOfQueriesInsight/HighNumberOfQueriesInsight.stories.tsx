import { Meta, StoryObj } from "@storybook/react";
import { HighNumberOfQueriesInsight } from ".";
import { mockedHighNumberOfQueriesInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HighNumberOfQueriesInsight> = {
  title:
    "Insights/deprecated/InsightList/insightCards/HighNumberOfQueriesInsight",
  component: HighNumberOfQueriesInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedHighNumberOfQueriesInsight
  }
};
