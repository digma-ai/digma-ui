import { Meta, StoryObj } from "@storybook/react";
import { NPlusOneAffectedEndpoints } from ".";
import { mockedNPlusOneInsight } from "../../../NPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NPlusOneAffectedEndpoints> = {
  title: "Insights/tickets/common/NPlusOneAffectedEndpoints",
  component: NPlusOneAffectedEndpoints,
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
      ...mockedNPlusOneInsight,
      endpoints: [
        ...mockedNPlusOneInsight.endpoints,
        {
          ...mockedNPlusOneInsight.endpoints[0],
          endpointInfo: {
            ...mockedNPlusOneInsight.endpoints[0].endpointInfo,
            route: `${mockedNPlusOneInsight.endpoints[0].endpointInfo.route}1`
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
      ...mockedNPlusOneInsight,
      endpoints: []
    }
  }
};
