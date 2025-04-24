import type { Meta, StoryObj } from "@storybook/react";
import { InsightCardRenderer } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCardRenderer> = {
  title: "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer",
  component: InsightCardRenderer,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof InsightCardRenderer>;

export const Default: Story = {};
