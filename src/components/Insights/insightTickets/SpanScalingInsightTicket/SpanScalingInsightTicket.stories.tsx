import { Meta, StoryObj } from "@storybook/react";
import { SpanScalingInsightTicket } from ".";
import {
  mockedSpanScalingInsight,
  ofEndpoint,
  withRootCause
} from "../../InsightsCatalog/InsightsPage/insightCards/SpanScalingInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanScalingInsightTicket> = {
  title: "Insights/insightTickets/SpanScalingInsightTicket",
  component: SpanScalingInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultInsight = {
  ...mockedSpanScalingInsight,
  ...ofEndpoint,
  ...withRootCause
};

export const Default: Story = {
  args: {
    data: {
      insight: DefaultInsight,
      spanCodeObjectId: DefaultInsight.spanInfo?.spanCodeObjectId
    }
  }
};
