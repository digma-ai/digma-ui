import { Meta, StoryObj } from "@storybook/react";
import { Checkmark } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Checkmark> = {
  title: "common/v3/Checkmark",
  component: Checkmark,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: false
  }
};

export const Checked: Story = {
  args: {
    value: true
  }
};

export const Disabled: Story = {
  args: {
    value: true,
    disabled: true
  }
};
