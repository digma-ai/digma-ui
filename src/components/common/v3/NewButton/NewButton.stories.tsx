import type { Meta, StoryObj } from "@storybook/react";
import { NewButton } from ".";
import { CrosshairIcon } from "../../icons/CrosshairIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NewButton> = {
  title: "common/v3/NewButton",
  component: NewButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: CrosshairIcon,
    label: "Click me",
    buttonType: "primary"
  }
};

export const Secondary: Story = {
  args: {
    icon: CrosshairIcon,
    label: "Click me",
    buttonType: "secondary"
  }
};

export const PrimaryBorderless: Story = {
  args: {
    icon: CrosshairIcon,
    label: "Click me",
    buttonType: "primaryBorderless"
  }
};

export const SecondaryBorderless: Story = {
  args: {
    icon: CrosshairIcon,
    label: "Click me",
    buttonType: "secondaryBorderless"
  }
};
