import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EnvironmentBar } from ".";
import { mockedEnvironments } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentBar> = {
  title: "Navigation/EnvironmentBar",
  component: EnvironmentBar,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EnvironmentBar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    environments: mockedEnvironments,
    selectedEnvironment: mockedEnvironments[0]
  }
};

export const Disabled: Story = {
  args: {
    environments: []
  }
};
