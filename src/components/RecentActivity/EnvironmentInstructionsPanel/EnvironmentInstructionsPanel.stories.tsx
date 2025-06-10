import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EnvironmentInstructionsPanel } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import type { ConfigContextData } from "../../common/App/types";
import { DeploymentType } from "../../common/App/types";
import type { ExtendedEnvironment } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EnvironmentInstructionsPanel> = {
  title: "Recent Activity/EnvironmentInstructionsPanel",
  component: EnvironmentInstructionsPanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EnvironmentInstructionsPanel>;

const mockedConfig: ConfigContextData = {
  ...initialState,
  backendInfo: {
    applicationVersion: "0.3.15",
    deploymentType: DeploymentType.DockerCompose,
    centralize: false
  },
  runConfig: {
    environmentId: null,
    environmentName: null,
    environmentType: "Private",
    userId: "123",
    observabilityMode: "OtelAgent",
    isRunConfigurationSupported: true,
    javaToolOptions: "javaToolOptions"
  },
  environment: {
    name: "Development",
    id: "123",
    type: "Private"
  },
  userInfo: {
    id: "123"
  }
};

const mockedEnvironment: ExtendedEnvironment = {
  name: "Development",
  id: "123",
  hasRecentActivity: false,
  type: "Private",
  token: null,
  serverApiUrl: null,
  isOrgDigmaSetupFinished: false,
  additionToConfigResult: null
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Private: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    environment: mockedEnvironment
  }
};

export const PrivateRunConfigSet: Story = {
  name: "Private with run config set",
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          runConfig: {
            ...mockedConfig.runConfig!,
            environmentName: "Development",
            environmentId: "123"
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    environment: mockedEnvironment
  }
};

export const Public: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    environment: { ...mockedEnvironment, type: "Public" }
  }
};

export const NotSupportedConfiguration: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          runConfig: {
            ...mockedConfig.runConfig!,
            isRunConfigurationSupported: false,
            javaToolOptions: "javaToolOptions"
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    environment: mockedEnvironment
  }
};
