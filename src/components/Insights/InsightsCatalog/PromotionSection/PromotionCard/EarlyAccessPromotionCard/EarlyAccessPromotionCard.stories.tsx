import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EarlyAccessPromotionCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EarlyAccessPromotionCard> = {
  title:
    "Insights/InsightsCatalog/PromotionSection/PromotionCard/EarlyAccessPromotionCard",
  component: EarlyAccessPromotionCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EarlyAccessPromotionCard>;

export const Default: Story = {
  args: {}
};
