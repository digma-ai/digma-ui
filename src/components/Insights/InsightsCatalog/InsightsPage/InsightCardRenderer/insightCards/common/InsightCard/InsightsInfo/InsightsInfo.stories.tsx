import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { InsightsInfo } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightsInfo> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightsInfo",
  component: InsightsInfo,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof InsightsInfo>;

export const Default: Story = {
  args: {
    isOpen: true,
    description: () => (
      <>
        This area significantly slows down the entire request and takes up at
        least 30% of the request time. You should consider making this code
        asynchronous or otherwise optimize it.
      </>
    )
  }
};
