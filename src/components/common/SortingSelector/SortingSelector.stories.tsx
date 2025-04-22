import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SortingSelector } from ".";
import { SortingOrder } from "../../../redux/services/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SortingSelector> = {
  title: "common/SortingSelector",
  component: SortingSelector,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof SortingSelector>;

export const Default: Story = {
  args: {
    defaultSorting: {
      criterion: "date",
      order: SortingOrder.Asc
    },
    onChange: fn(),
    options: [
      {
        label: "Date",
        defaultOrder: SortingOrder.Asc,
        value: "date"
      },
      {
        label: "Name",
        defaultOrder: SortingOrder.Desc,
        value: "name"
      }
    ]
  }
};
