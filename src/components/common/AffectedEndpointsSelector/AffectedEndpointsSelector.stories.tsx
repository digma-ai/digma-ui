import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AffectedEndpointsSelector } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AffectedEndpointsSelector> = {
  title: "Insights/InsightsCatalog/InsightsPage/AffectedEndpointsSelector",
  component: AffectedEndpointsSelector,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof AffectedEndpointsSelector>;

export const Default: Story = {
  args: {
    value: "spanCodeObjectId1",
    options: [
      {
        route: "test",
        serviceName:
          "veryLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongServiceName1",
        spanCodeObjectId: "spanCodeObjectId1",
        metric: {
          value: 100,
          label: "100 ms"
        }
      },
      {
        route:
          "veryLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongServiceName2",
        serviceName: "test1",
        spanCodeObjectId: "spanCodeObjectId2",
        metric: {
          value: 200,
          label: "200 ms"
        }
      },
      {
        route: "test",
        serviceName: "test1",
        spanCodeObjectId: "spanCodeObjectId2",
        metric: {
          value: 300,
          label: "300 ms"
        }
      }
    ]
  }
};
