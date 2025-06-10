import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EnvironmentVariableCode } from ".";
import { ConfigContext, initialState } from "../../../common/App/ConfigContext";
import type { ConfigContextData } from "../../../common/App/types";
import { DeploymentType } from "../../../common/App/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentVariableCode> = {
  title: "Recent Activity/EnvironmentInstructionsPanel/EnvironmentVariableCode",
  component: EnvironmentVariableCode,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EnvironmentVariableCode>;

const mockedConfig: ConfigContextData = {
  ...initialState,
  backendInfo: {
    applicationVersion: "0.3.15",
    deploymentType: DeploymentType.DockerCompose,
    centralize: false
  },
  environment: {
    id: "123",
    name: "Development",
    type: "Private"
  },
  userInfo: {
    id: "123"
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LocalDeployment: Story = {
  name: "Local deployment",
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const LocalDeploymentMicrometer: Story = {
  name: "Local deployment (Micrometer)",
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{ ...mockedConfig, isMicrometerProject: true }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const CentralizedDeployment: Story = {
  name: "Centralized deployment",
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          backendInfo: {
            ...mockedConfig.backendInfo!,
            centralize: true
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const PrivateInCentralizedDeploymentMicrometer: Story = {
  name: "Centralized deployment (Micrometer)",
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          backendInfo: {
            ...mockedConfig.backendInfo!,
            centralize: true
          },
          isMicrometerProject: true
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const DeprecatedBehavior: Story = {
  name: "Behavior for BE < v0.3.15",
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          backendInfo: {
            ...mockedConfig.backendInfo!,
            applicationVersion: "0.3.14"
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const DeprecatedBehaviorMicrometer: Story = {
  name: "Behavior for BE < v0.3.15 (Micrometer)",
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          backendInfo: {
            ...mockedConfig.backendInfo!,
            applicationVersion: "0.3.14"
          },
          isMicrometerProject: true
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
