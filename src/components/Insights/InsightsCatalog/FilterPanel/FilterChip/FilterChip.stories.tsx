import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { FilterChip } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FilterChip> = {
  title: "Insights/InsightsCatalog/FilterPanel/FilterChip",
  component: FilterChip,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const All: Story = {
  args: {
    disabled: false,
    selected: false,
    type: "all",
    count: 100
  }
};

export const Critical: Story = {
  args: {
    disabled: false,
    selected: false,
    type: "critical",
    count: 100
  }
};

export const Unread: Story = {
  args: {
    disabled: false,
    selected: false,
    type: "unread",
    count: 12
  }
};
