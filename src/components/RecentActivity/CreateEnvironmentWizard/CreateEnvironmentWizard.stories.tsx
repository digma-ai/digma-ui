import type { Meta, StoryObj } from "@storybook/react";
import { CreateEnvironmentWizard } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { DeploymentType } from "../../common/App/types";
import { actions } from "../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CreateEnvironmentWizard> = {
  title: "Recent Activity/CreateEnvironmentWizard",
  component: CreateEnvironmentWizard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof CreateEnvironmentWizard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

export const WithError: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_CREATE_ENVIRONMENT_RESULT,
        payload: {
          errors: [
            {
              errorCode: "ExistingEnvironmentName",
              errorDescription: "some error message"
            }
          ]
        }
      });
    }, 1000);
  }
};

export const WithoutRegisteredUser: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          backendInfo: {
            applicationVersion: "v0.2.243",
            deploymentType: DeploymentType.DockerCompose,
            centralize: false
          },
          userRegistrationEmail: ""
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const IsCentralized: Story = {
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
