import { Meta, StoryObj } from "@storybook/react";
import { BottleneckEndpoints } from ".";
import { mockedBottleneckInsight } from "../../../BottleneckInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BottleneckEndpoints> = {
  title: "Insights/tickets/common/BottleneckEndpoints",
  component: BottleneckEndpoints,
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
          endpointInfo: {
            ...mockedSlowEndpoints[0].endpointInfo,
            route: `${mockedSlowEndpoints[0].endpointInfo.route}1`
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
