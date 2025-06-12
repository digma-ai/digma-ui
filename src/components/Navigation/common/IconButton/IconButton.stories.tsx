import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { IconButton } from ".";
import { CodeIcon } from "../../../common/icons/16px/CodeIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title: "Navigation/common/IconButton",
  component: IconButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof IconButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    icon: <CodeIcon size={20} color={"currentColor"} />
  }
};

export const Disabled: Story = {
  args: {
    icon: <CodeIcon size={20} color={"currentColor"} />,
    isDisabled: true
  }
};
