import type { Meta, StoryObj } from "@storybook/react";
import { OccurrenceChart } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof OccurrenceChart> = {
  title: "Errors/NewErrorCard/OccurrenceChart",
  component: OccurrenceChart,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
type Story = StoryObj<typeof OccurrenceChart>;

export const Default: Story = {};
