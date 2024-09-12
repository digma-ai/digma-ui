import { Meta, StoryObj } from "@storybook/react";
import { EarlyAccessPromotionCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EarlyAccessPromotionCard> = {
  title: "Insights/InsightsCatalog/PromotionCard/EarlyAccessPromotionCard",
  component: EarlyAccessPromotionCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
