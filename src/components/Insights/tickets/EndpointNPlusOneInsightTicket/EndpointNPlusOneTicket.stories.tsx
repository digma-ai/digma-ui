import { Meta, StoryObj } from "@storybook/react";
import { EndpointNPlusOneInsightTicket } from ".";
import { mockedEndpointNPlusOneInsight } from "../../EndpointNPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointNPlusOneInsightTicket> = {
  title: "Insights/tickets/EndpointNPlusOneTicket",
  component: EndpointNPlusOneInsightTicket,
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
      insight: mockedEndpointNPlusOneInsight,
      spanCodeObjectId:
        mockedEndpointNPlusOneInsight.spans[0].clientSpan.spanCodeObjectId
    }
  }
};
