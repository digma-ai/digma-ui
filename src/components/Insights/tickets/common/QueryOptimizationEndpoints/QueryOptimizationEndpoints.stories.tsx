import { Meta, StoryObj } from "@storybook/react";
import { QueryOptimizationEndpoints } from ".";
import { mockedQueryOptimizationInsight } from "../../../QueryOptimizationInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof QueryOptimizationEndpoints> = {
  title: "Insights/tickets/common/QueryOptimizationEndpoints",
  component: QueryOptimizationEndpoints,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockedEndpoints = mockedQueryOptimizationInsight.endpoints || [];

export const Default: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      endpoints: [
        ...mockedEndpoints,
        {
          ...mockedEndpoints[0],
          endpointInfo: {
            ...mockedEndpoints[0].endpointInfo,
            route: `${mockedEndpoints[0].endpointInfo.route}1`
          }
        }
      ]
    }
  }
};

export const WithoutInsight: Story = {};

export const WithNoAffectedEndpoints: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      endpoints: []
    }
  }
};
