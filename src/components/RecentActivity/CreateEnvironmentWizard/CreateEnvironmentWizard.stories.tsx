import { Meta, StoryObj } from "@storybook/react";
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

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    onClose: () => {
      // close
    }
  }
};

export const Errored: Story = {
  args: {
    onClose: () => {
      // close
    }
  },
  play: () => {
    setTimeout(() => {
      window.setTimeout(() => {
        window.postMessage({
          type: "digma",
          action: actions.ENVIRONMENT_CREATED,
          payload: {
            errors: [
              {
                errorCode: "ExistingEnvironmentName",
                errorDescription: "some errororroro"
              }
            ]
          }
        });
      });
    }, 1000);
  }
};

export const WithoutRegisteredUser: Story = {
  args: {
    onClose: () => {
      // close
    }
  },
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          backendInfo: {
            applicationVersion: "v0.2.243",
            deploymentType: DeploymentType.DOCKER_COMPOSE,
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
  args: {
    onClose: () => {
      // close
    }
  },
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          backendInfo: {
            applicationVersion: "v0.2.243",
            deploymentType: DeploymentType.DOCKER_COMPOSE,
            centralize: true
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
