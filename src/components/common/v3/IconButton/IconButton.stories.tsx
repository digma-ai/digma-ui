import { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";
import { CrosshairIcon } from "../../icons/CrosshairIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title: "common/v3/IconButton",
  component: IconButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: {
      component: CrosshairIcon
    }
  }
};

export const Disabled: Story = {
  args: {
    icon: {
      component: CrosshairIcon
    },
    isDisabled: true
  }
};
