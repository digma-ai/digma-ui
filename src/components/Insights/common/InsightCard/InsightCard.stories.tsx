import { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from ".";
import { mockedEndpointNPlusOneInsight } from "../../EndpointNPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title: "Insights/common/InsightCard",
  component: InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAsync: true,
    insight: { ...mockedEndpointNPlusOneInsight, criticality: 0.9 }
  }
};
