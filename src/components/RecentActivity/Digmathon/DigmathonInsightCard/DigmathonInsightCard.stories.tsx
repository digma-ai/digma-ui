import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DigmathonInsightCard } from ".";
import { InsightType } from "../../../../types";
import { getDigmathonInsightCardData } from "../getDigmathonInsightData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DigmathonInsightCard> = {
  title: "Recent Activity/Digmathon/DigmathonInsightCard",
  component: DigmathonInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof DigmathonInsightCard>;

const data = getDigmathonInsightCardData(InsightType.EndpointSpanNPlusOne);

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    number: 1,
    data,
    isActive: false
  }
};

export const Active: Story = {
  args: {
    number: 1,
    data,
    isActive: true
  }
};
