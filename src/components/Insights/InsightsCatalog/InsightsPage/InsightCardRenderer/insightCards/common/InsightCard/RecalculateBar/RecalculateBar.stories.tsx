import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RecalculateBar } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RecalculateBar> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/RecalculateBar",
  component: RecalculateBar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof RecalculateBar>;

export const Default: Story = {};
