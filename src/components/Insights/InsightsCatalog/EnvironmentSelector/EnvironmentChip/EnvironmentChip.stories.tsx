import { Meta, StoryObj } from "@storybook/react";

import { EnvironmentChip } from ".";
import { Environment } from "../../../../common/App/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentChip> = {
  title: "Insights/InsightsCatalog/EnvironmentSelector/EnvironmentChip",
  component: EnvironmentChip,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockedEnvironment: Environment = {
  type: "Public",
  id: "env1",
  name: "Env1"
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    environment: mockedEnvironment,
    isActive: false
  }
};

export const Active: Story = {
  args: {
    environment: mockedEnvironment,
    isActive: true
  }
};

export const WithHighCriticalIssues: Story = {
  args: {
    environment: mockedEnvironment,
    isActive: false,
    issueCounts: {
      highCriticality: 1,
      mediumCriticality: 2,
      lowCriticality: 3
    }
  }
};

export const WithMediumCriticalIssues: Story = {
  args: {
    environment: mockedEnvironment,
    isActive: false,
    issueCounts: {
      highCriticality: 0,
      mediumCriticality: 2,
      lowCriticality: 3
    }
  }
};

export const WithLowCriticalIssues: Story = {
  args: {
    environment: mockedEnvironment,
    isActive: false,
    issueCounts: {
      highCriticality: 0,
      mediumCriticality: 0,
      lowCriticality: 3
    }
  }
};
