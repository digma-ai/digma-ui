import { Meta, StoryObj } from "@storybook/react";
import { NPlusOneInsightTicket } from ".";
import { mockedNPlusOneInsight } from "../../NPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NPlusOneInsightTicket> = {
  title: "Insights/tickets/NPlusOneInsightTicket",
  component: NPlusOneInsightTicket,
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
      insight: mockedNPlusOneInsight
    }
  }
};
