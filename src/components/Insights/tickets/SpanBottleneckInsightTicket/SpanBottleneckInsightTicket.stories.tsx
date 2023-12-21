import { Meta, StoryObj } from "@storybook/react";
import { SpanBottleneckInsightTicket } from ".";
import { mockedSpanBottleneckInsight } from "../../SpanBottleneckInsight/mockData";

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
      insight: mockedSpanBottleneckInsight,
      spanCodeObjectId:
        mockedSpanBottleneckInsight.spans[0].spanInfo.spanCodeObjectId
    }
  }
};
