import type { Meta, StoryObj } from "@storybook/react";
import { SpanScalingByRootCauseInsightTicket } from ".";
import {
  mockedSpanScalingInsight,
  ofEndpoint,
  withRootCause
} from "../../../InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanScalingInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanScalingByRootCauseInsightTicket> = {
  title:
    "Insights/InsightTicketRenderer/insightTickets/SpanScalingByRootCauseInsightTicket",
  component: SpanScalingByRootCauseInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SpanScalingByRootCauseInsightTicket>;

const DefaultInsight = {
  ...mockedSpanScalingInsight,
  ...ofEndpoint,
  ...withRootCause
};

export const Default: Story = {
  args: {
    data: {
      insight: DefaultInsight,
      spanCodeObjectId: DefaultInsight.rootCauseSpans[0].spanCodeObjectId
    },
    rootCauseSpanInfo: DefaultInsight.rootCauseSpans[0]
  }
};
