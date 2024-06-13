import { Meta, StoryObj } from "@storybook/react";

import { EnvironmentBar } from ".";
import { Environment } from "../../common/App/types";

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

type Story = StoryObj<typeof meta>;

const mockedEnvironments: Environment[] = [
  {
    id: "DEV",
    name: "DEV",
    type: "Private"
  },
  {
    id: "QA",
    name: "QA",
    type: "Private"
  },
  {
    id: "STAGING",
    name: "STAGING",
    type: "Private"
  },
  {
    id: "UAT",
    name: "UAT",
    type: "Private"
  },
  {
    id: "PROD",
    name: "PROD",
    type: "Private"
  }
];

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
