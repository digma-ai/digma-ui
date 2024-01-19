import { Meta, StoryObj } from "@storybook/react";
import { BottleneckInsight } from ".";
import { mockedBottleneckInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BottleneckInsight> = {
  title: "Insights/BottleneckInsight",
  component: BottleneckInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedBottleneckInsight
  }
};

export const LinkedJira: Story = {
  args: {
    insight: { ...mockedBottleneckInsight, ticketLink: "https://digma.ai/1" }
  }
};
