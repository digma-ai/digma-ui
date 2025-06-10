import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Scaling } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Scaling> = {
  title: "Highlights/Scaling",
  component: Scaling,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Scaling>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const NoData: Story = {};
