import { Meta, StoryObj } from "@storybook/react";
import { InstallationWizard } from ".";
import { actions as globalActions } from "../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InstallationWizard> = {
  title: "Installation Wizard/InstallationWizard",
  component: InstallationWizard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NoDigmaInstalled: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DOCKER_INSTALLED,
      payload: {
        isDockerInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DOCKER_COMPOSE_INSTALLED,
      payload: {
        isDockerComposeInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DIGMA_ENGINE_INSTALLED,
      payload: {
        isDigmaEngineInstalled: false
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_DIGMA_STATUS,
      payload: {
        connection: {
          type: null,
          status: false
        },
        runningDigmaInstances: []
      }
    });
  }
};

export const DigmaEngineInstalledAndRunning: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DOCKER_INSTALLED,
      payload: {
        isDockerInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DOCKER_COMPOSE_INSTALLED,
      payload: {
        isDockerComposeInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DIGMA_ENGINE_INSTALLED,
      payload: {
        isDigmaEngineInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_DIGMA_STATUS,
      payload: {
        connection: {
          type: "local",
          status: true
        },
        runningDigmaInstances: ["localEngine"]
      }
    });
  }
};

export const DigmaEngineInstalledAndStopped: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DOCKER_INSTALLED,
      payload: {
        isDockerInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DOCKER_COMPOSE_INSTALLED,
      payload: {
        isDockerComposeInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_IS_DIGMA_ENGINE_INSTALLED,
      payload: {
        isDigmaEngineInstalled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_DIGMA_STATUS,
      payload: {
        connection: {
          type: null,
          status: false
        },
        runningDigmaInstances: []
      }
    });
  }
};
