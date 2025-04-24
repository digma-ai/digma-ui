import type { Meta, StoryObj } from "@storybook/react";
import { RegisterStep } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RegisterStep> = {
  title: "Recent Activity/CreateEnvironmentWizard/RegisterStep",
  component: RegisterStep,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof RegisterStep>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
