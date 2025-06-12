import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RegisterForm } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RegisterForm> = {
  title: "common/RegisterForm",
  component: RegisterForm,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof RegisterForm>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
