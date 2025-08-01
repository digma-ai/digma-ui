import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DurationChange } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DurationChange> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/DurationChange",
  component: DurationChange,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof DurationChange>;

export const Degradation: Story = {
  args: {
    previousDuration: {
      value: 455.16,
      unit: "ms",
      raw: 455156000
    },
    currentDuration: {
      value: 3.22,
      unit: "sec",
      raw: 3222871000
    },
    changeTime: "2023-06-30T11:09:55.000Z"
  }
};

export const Improved: Story = {
  args: {
    previousDuration: {
      value: 3.22,
      unit: "sec",
      raw: 3222871000
    },
    currentDuration: {
      value: 455.16,
      unit: "ms",
      raw: 455156000
    },
    changeTime: "2023-06-30T11:09:55.000Z"
  }
};
