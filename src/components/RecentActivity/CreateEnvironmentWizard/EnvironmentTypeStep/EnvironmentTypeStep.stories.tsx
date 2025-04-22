import type { Meta, StoryObj } from "@storybook/react";
import { EnvironmentTypeStep } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentTypeStep> = {
  title: "Recent Activity/CreateEnvironmentWizard/EnvironmentTypeStep",
  component: EnvironmentTypeStep,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EnvironmentTypeStep>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
