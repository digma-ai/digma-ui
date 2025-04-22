import type { Meta, StoryObj } from "@storybook/react";
import { PromotionTag } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PromotionTag> = {
  title: "Insights/InsightsCatalog/PromotionSection/PromotionCard/PromotionTag",
  component: PromotionTag,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof PromotionTag>;

export const Default: Story = {
  args: {}
};
