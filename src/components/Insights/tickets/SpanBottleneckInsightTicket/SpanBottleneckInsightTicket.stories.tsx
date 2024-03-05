import { Meta, StoryObj } from "@storybook/react";
import { SpanBottleneckInsightTicket } from ".";
import { mockedSpanBottleneckInsight } from "../../SpanBottleneckInsight/mockData";
import { InsightType } from "../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanBottleneckInsightTicket> = {
  title: "Insights/tickets/SpanBottleneckInsightTicket",
  component: SpanBottleneckInsightTicket,
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
      insight: {
        ...mockedSpanBottleneckInsight,
        type: InsightType.EndpointBottleneck,
        span: {
          ...mockedSpanBottleneckInsight.spans[0],
          requestPercentage: 0.4,
          avgFractionWhenBeingBottleneck: 0.3
        }
      },
      spanCodeObjectId:
        mockedSpanBottleneckInsight.spans[0].spanInfo.spanCodeObjectId
    }
  }
};
