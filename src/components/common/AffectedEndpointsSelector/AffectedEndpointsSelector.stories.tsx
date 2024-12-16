import type { Meta, StoryObj } from "@storybook/react";
import { AffectedEndpointsSelector } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AffectedEndpointsSelector> = {
  title: "Insights/InsightsCatalog/InsightPage/AffectedEndpointsSelector",
  component: AffectedEndpointsSelector,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "spanCodeObjectId1",
    options: [
      {
        route: "test",
        serviceName:
          "someasasdasdasdasdasdasdawerereasdsadsadsadsadsadasdsadasdsadsdhfkjdhskjfgdf;lgjhdfhglkdfhgklhsdklfghkhgdfgkdfklghrthysdfhsbfheslkbyieryiobyrieuytirosynoiuybioyustest2",
        spanCodeObjectId: "spanCodeObjectId1"
      },
      {
        route:
          "someasasdasdasdasdasdasdawerereasdsadsadsadsadsadasdsadasdsadsdhfkjdhskjfgdf;lgjhdfhglkdfhgklhsdklfghkhgdfgkdfklghrthysdfhsbfheslkbyieryiobyrieuytirosynoiuybioyustest",
        serviceName: "test1",
        spanCodeObjectId: "spanCodeObjectId2"
      },
      {
        route: "test",
        serviceName: "test1",
        spanCodeObjectId: "spanCodeObjectId2"
      }
    ]
  }
};
