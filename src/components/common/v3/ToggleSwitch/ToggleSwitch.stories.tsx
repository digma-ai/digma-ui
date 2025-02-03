import type { Meta, StoryObj } from "@storybook/react";
import { ToggleSwitch } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ToggleSwitch> = {
  title: "common/v3/ToggleSwitch",
  component: ToggleSwitch,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click here",
    checked: false,
    disabled: false
  }
};
