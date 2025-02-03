import type { Meta, StoryObj } from "@storybook/react";
import { CodeButton } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CodeButton> = {
  title: "Navigation/CodeButton",
  component: CodeButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    hasObservability: true,
    hasData: true,
    isDisabled: false,
    isAlreadyAtScope: false
  }
};

export const HasNoObservability: Story = {
  args: {
    hasObservability: false,
    hasData: false
  }
};

export const HasNoData: Story = {
  args: {
    hasObservability: true,
    hasData: false
  }
};

export const AlreadyAtCode: Story = {
  args: {
    hasObservability: true,
    hasData: true,
    isDisabled: false,
    isAlreadyAtScope: true
  }
};

export const HasErrors: Story = {
  args: {
    hasErrors: true
  }
};

export const Disabled: Story = {
  args: {
    isDisabled: true
  }
};
