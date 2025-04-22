import type { Meta, StoryObj } from "@storybook/react";
import { EnvironmentTypePanel } from ".";
import { ConfigContext, initialState } from "../../../common/App/ConfigContext";
import { DeploymentType } from "../../../common/App/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentTypePanel> = {
  title: "Recent Activity/CreateEnvironmentWizard/EnvironmentTypePanel",
  component: EnvironmentTypePanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EnvironmentTypePanel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

export const Centralized: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          backendInfo: {
            applicationVersion: "v0.2.243",
            deploymentType: DeploymentType.DockerCompose,
            centralize: true
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
