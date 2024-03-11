import { Meta, StoryObj } from "@storybook/react";
import { SpanEndpointBottleneckInsight } from ".";
import { mockedBottleneckInsight } from "../../../BottleneckInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanEndpointBottleneckInsight> = {
  title: "Insights/common/insights/SpanEndpointBottleneckInsight",
  component: SpanEndpointBottleneckInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockedSlowEndpoints = mockedBottleneckInsight.slowEndpoints || [];

export const Default: Story = {
  args: {
    insight: {
      ...mockedBottleneckInsight,
      slowEndpoints: [
        ...mockedSlowEndpoints,
        {
          ...mockedSlowEndpoints[0],
          requestPercentage: 100,
          endpointInfo: {
            ...mockedSlowEndpoints[0].endpointInfo,
            route: `${mockedSlowEndpoints[0].endpointInfo.route}1`,
            spanCodeObjectId: `${mockedSlowEndpoints[0].endpointInfo.spanCodeObjectId}1`
          }
        }
      ]
    }
  }
};

export const WithNoSlowEndpoints: Story = {
  args: {
    insight: {
      ...mockedBottleneckInsight,
      slowEndpoints: []
    }
  }
};
