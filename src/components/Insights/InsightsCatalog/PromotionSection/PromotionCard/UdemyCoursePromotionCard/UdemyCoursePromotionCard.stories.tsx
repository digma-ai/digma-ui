import { Meta, StoryObj } from "@storybook/react";
import { UdemyCoursePromotionCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof UdemyCoursePromotionCard> = {
  title:
    "Insights/InsightsCatalog/PromotionSection/PromotionCard/UdemyCoursePromotionCard",
  component: UdemyCoursePromotionCard,
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
