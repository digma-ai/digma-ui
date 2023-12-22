import { Meta, StoryObj } from "@storybook/react";
import { BottleneckInsightTicket } from ".";
import { mockedBottleneckInsight } from "../../BottleneckInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BottleneckInsightTicket> = {
  title: "Insights/tickets/BottleneckInsightTicket",
  component: BottleneckInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedBottleneckInsight
    }
  }
};
