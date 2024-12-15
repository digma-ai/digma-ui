import type { Meta, StoryObj } from "@storybook/react";
import { EnvironmentIcon } from ".";
import type { Environment } from "../App/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentIcon> = {
  title: "common/EnvironmentIcon",
  component: EnvironmentIcon,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockedEnvironment: Environment = {
  name: "Test",
  id: "test",
  type: "Private"
};

export const Private: Story = {
  args: {
    environment: mockedEnvironment
  }
};

export const Public: Story = {
  args: {
    environment: {
      ...mockedEnvironment,
      type: "Public"
    }
  }
};
