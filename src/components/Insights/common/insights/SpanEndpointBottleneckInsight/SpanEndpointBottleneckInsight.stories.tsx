import { Meta, StoryObj } from "@storybook/react";
import { SpanBottleneckEndpoints } from ".";
import { mockedBottleneckInsight } from "../../../BottleneckInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanBottleneckEndpoints> = {
  title: "Insights/common/insights/SpanBottleneckEndpoints",
  component: SpanBottleneckEndpoints,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: {
      ...mockedBottleneckInsight,
      slowEndpoints: [
        ...mockedBottleneckInsight.slowEndpoints,
        {
          ...mockedBottleneckInsight.slowEndpoints[0],
          requestPercentage: 100,
          endpointInfo: {
            ...mockedBottleneckInsight.slowEndpoints[0].endpointInfo,
            route: `${mockedBottleneckInsight.slowEndpoints[0].endpointInfo.route}1`,
            spanCodeObjectId: `${mockedBottleneckInsight.slowEndpoints[0].endpointInfo.spanCodeObjectId}1`
          }
        }
      ]
    }
  }
};

export const WithoutInsight: Story = {};

export const WithNoSlowEndpoints: Story = {
  args: {
    insight: {
      ...mockedBottleneckInsight,
      slowEndpoints: []
    }
  }
};
