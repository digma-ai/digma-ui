import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FilterPopup } from ".";
import { Select } from "../v3/Select";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FilterPopup> = {
  title: "common/FilterPopup",
  component: FilterPopup,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    onClose: fn(),
    title: "Filters",
    onClearAll: fn(),
    selectedFiltersCount: 0,
    filters: [
      {
        title: "Filter type",
        component: (
          <Select
            items={[{ label: "Option 1", value: "option1" }]}
            onChange={fn()}
          />
        )
      }
    ]
  }
};
