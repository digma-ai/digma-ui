import { Meta, StoryObj } from "@storybook/react";
import { ScalingIssueInsightTicket } from ".";
import { mockedSpanScalingInsight } from "../../ScalingIssueInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScalingIssueInsightTicket> = {
  title: "Insights/tickets/ScalingIssueInsightTicket",
  component: ScalingIssueInsightTicket,
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
      insight: mockedSpanScalingInsight,
      spanCodeObjectId:
        mockedSpanScalingInsight.spanInfo?.spanCodeObjectId
    }
  }
};
