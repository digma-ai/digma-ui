import { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { CrosshairIcon } from "../../icons/CrosshairIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "common/v3/Button",
  component: Button,
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

export const WithLabel: Story = {
  args: {
    label: "Click me",
    icon: CrosshairIcon
  }
};

export const Disabled: Story = {
  args: {
    label: "Click me",
    icon: CrosshairIcon,
    isDisabled: true
  }
};
