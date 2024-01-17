import { Meta, StoryObj } from "@storybook/react";
import { NPlusOneInsight } from ".";
import { mockedNPlusOneInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NPlusOneInsight> = {
  title: "Insights/NPlusOneInsight",
  component: NPlusOneInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedNPlusOneInsight
  }
};

export const LinkedJira: Story = {
  args: {
    insight: { ...mockedNPlusOneInsight, ticketLink: "https://digma.ai/1" }
  }
};
