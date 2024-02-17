import { Meta, StoryObj } from "@storybook/react";

import { EnvironmentMenu } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentMenu> = {
  title: "Navigation/EnvironmentMenu",
  component: EnvironmentMenu,
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
    environments: [
      {
        originalName: "TEST1",
        name: "TEST1"
      },
      {
        originalName: "TEST2",
        name: "TEST2"
      },
      {
        originalName: "TEST3",
        name: "TEST3"
      },
      {
        originalName: "DEV",
        name: "DEV"
      }
    ],
    selectedEnvironment: {
      originalName: "DEV",
      name: "DEV"
    }
  }
};

export const Disabled: Story = {
  args: {
    environments: [],
    isDisabled: true
  }
};
