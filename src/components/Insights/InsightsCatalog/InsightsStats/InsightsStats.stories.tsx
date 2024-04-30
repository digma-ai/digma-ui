import { Meta, StoryObj } from "@storybook/react";
import { InsightStats } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightStats> = {
  title: "Insights/InsightsCatalog/InsightStats",
  component: InsightStats,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    allIssuesCount: 100,
    criticalCount: 101,
    unreadCount: 12
  }
};

export const Old: Story = {
  args: {
    unreadCount: 12
  }
};
