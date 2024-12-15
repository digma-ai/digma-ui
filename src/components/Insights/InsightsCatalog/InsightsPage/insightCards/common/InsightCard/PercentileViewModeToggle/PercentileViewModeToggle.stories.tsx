import type { Meta, StoryObj } from "@storybook/react";
import { PercentileViewModeToggle } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PercentileViewModeToggle> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/PercentileViewModeToggle",
  component: PercentileViewModeToggle,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    viewMode: 0.5
  }
};
