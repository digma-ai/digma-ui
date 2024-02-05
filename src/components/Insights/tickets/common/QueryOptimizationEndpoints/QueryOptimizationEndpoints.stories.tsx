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

export const Default: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      endpoints: [
        ...mockedQueryOptimizationInsight.endpoints,
        {
          ...mockedQueryOptimizationInsight.endpoints[0],
          endpointInfo: {
            ...mockedQueryOptimizationInsight.endpoints[0].endpointInfo,
            route: `${mockedQueryOptimizationInsight.endpoints[0].endpointInfo.route}1`
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
