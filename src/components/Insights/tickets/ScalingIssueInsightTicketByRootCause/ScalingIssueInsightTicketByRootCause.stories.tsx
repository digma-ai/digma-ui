import { Meta, StoryObj } from "@storybook/react";
import { ScalingIssueInsightTicketByRootCause } from ".";
import { MockedSpanScalingBadlyInsight } from "../../ScalingIssueInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScalingIssueInsightTicketByRootCause> = {
  title: "Insights/tickets/ScalingIssueInsightTicketByRootCause",
  component: ScalingIssueInsightTicketByRootCause,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultInsight = new MockedSpanScalingBadlyInsight()
  .ofEndpoint()
  .withRootCause();

export const Default: Story = {
  args: {
    data: {
      insight: DefaultInsight,
      spanCodeObjectId: DefaultInsight.rootCauseSpans[0].spanCodeObjectId
    },
    rootCauseSpanInfo: DefaultInsight.rootCauseSpans[0]
  }
};
