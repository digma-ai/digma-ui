import type { Meta, StoryObj } from "@storybook/react-webpack5";
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

type Story = StoryObj<typeof NewIconButton>;

export const Primary: Story = {
  args: {
    icon: CrosshairIcon,
    buttonType: "primary"
  }
};

export const Secondary: Story = {
  args: {
    icon: CrosshairIcon,
    buttonType: "secondary"
  }
};

export const SecondaryBorderless: Story = {
  args: {
    icon: CrosshairIcon,
    buttonType: "secondaryBorderless"
  }
};
