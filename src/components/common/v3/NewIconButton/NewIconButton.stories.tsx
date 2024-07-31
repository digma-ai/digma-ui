import { Meta, StoryObj } from "@storybook/react";
import { NewIconButton } from ".";
import { CrosshairIcon } from "../../icons/CrosshairIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NewIconButton> = {
  title: "common/v3/NewIconButton",
  component: NewIconButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: CrosshairIcon
  }
};

export const Disabled: Story = {
  args: {
    icon: CrosshairIcon,
    isDisabled: true
  }
};
