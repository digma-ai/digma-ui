import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { FilterPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FilterPanel> = {
  title: "Insights/InsightsCatalog/FilterPanel",
  component: FilterPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof FilterPanel>;

export const Default: Story = {
  args: {
    allIssuesCount: 100,
    criticalCount: 101,
    unreadCount: 102
  }
};

export const WithoutAllAndUnreadCounts: Story = {
  args: {
    unreadCount: 102
  }
};
