import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { IconTag } from ".";
import { CodeIcon } from "../icons/16px/CodeIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconTag> = {
  title: "common/IconTag",
  component: IconTag,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof IconTag>;

export const Small: Story = {
  args: {
    icon: CodeIcon,
    size: "small"
  }
};

export const Large: Story = {
  args: {
    icon: CodeIcon,
    size: "large"
  }
};
