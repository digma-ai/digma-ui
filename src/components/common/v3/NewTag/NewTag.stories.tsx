import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NewTag } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NewTag> = {
  title: "common/v3/NewTag",
  component: NewTag,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof NewTag>;

export const Default: Story = {};
