import { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { UserIcon } from "../icons/UserIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Common/Button",
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
    children: "Click me",
    // onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled: false
  }
};

export const WithIcon: Story = {
  args: {
    children: "Click me",
    icon: { component: UserIcon },
    disabled: false
  }
};
