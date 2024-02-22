import { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from ".";
import { mockedEndpointNPlusOneInsight } from "../../../Insights/EndpointNPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title: "Common/v3/InsightCard",
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
    isNew: true,
    insight: mockedEndpointNPlusOneInsight
  }
};

export const OnlyContent: Story = {
  args: {
    content: <div>Hover me</div>
  }
};
