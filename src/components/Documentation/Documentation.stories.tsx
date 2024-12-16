import type { Meta, StoryObj } from "@storybook/react";

import { Documentation } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Documentation> = {
  title: "Documentation/Documentation",
  component: Documentation,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const RunDigmaWithCommandLine: Story = {
  args: {
    page: "run-digma-with-terminal"
  }
};

export const RunDigmaWithDocker: Story = {
  args: {
    page: "run-digma-with-docker"
  }
};

export const RunDigmaWithGradleTasks: Story = {
  args: {
    page: "run-digma-with-gradle-tasks"
  }
};

export const EnvironmentTypes: Story = {
  args: {
    page: "environment-types"
  }
};
