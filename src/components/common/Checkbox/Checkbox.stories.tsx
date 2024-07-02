import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Checkbox> = {
  title: "common/Checkbox",
  component: Checkbox,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click me",
    value: false
  }
};

export const Checked: Story = {
  args: {
    label: "Click me",
    value: true
  }
};

export const Disabled: Story = {
  args: {
    label: "Click me",
    value: true,
    disabled: true
  }
};
