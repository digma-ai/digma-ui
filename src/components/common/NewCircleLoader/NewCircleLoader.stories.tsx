import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NewCircleLoader } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NewCircleLoader> = {
  title: "common/NewCircleLoader",
  component: NewCircleLoader,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof NewCircleLoader>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

export const WithCustomSize: Story = {
  args: {
    size: 50
  }
};
