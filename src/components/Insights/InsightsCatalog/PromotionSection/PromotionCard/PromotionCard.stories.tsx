import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PromotionCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PromotionCard> = {
  title: "Insights/InsightsCatalog/PromotionSection/PromotionCard",
  component: PromotionCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof PromotionCard>;

export const Default: Story = {
  args: {}
};
