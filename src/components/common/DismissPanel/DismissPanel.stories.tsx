import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DismissPanel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DismissPanel> = {
  title: "common/DismissPanel",
  component: DismissPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Dismiss insight?",
    onDismiss: fn(),
    onShow: fn()
  }
};
