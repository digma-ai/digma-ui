import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SortingSelector } from ".";
import { SORTING_ORDER } from "../../../redux/services/types";

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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultSorting: {
      criterion: "date",
      order: SORTING_ORDER.ASC
    },
    onChange: fn(),
    options: [
      {
        label: "Date",
        defaultOrder: SORTING_ORDER.ASC,
        value: "date"
      },
      {
        label: "Name",
        defaultOrder: SORTING_ORDER.DESC,
        value: "name"
      }
    ]
  }
};
