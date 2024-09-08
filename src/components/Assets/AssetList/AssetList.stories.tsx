import { Meta, StoryObj } from "@storybook/react";

import { AssetList } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { ConfigContextData, DeploymentType } from "../../common/App/types";
import { actions } from "../actions";
import { mockedAssetsData } from "./mockedData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetList> = {
  title: "Assets/AssetList",
  component: AssetList,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const mockedConfig: ConfigContextData = {
  ...initialState,
  backendInfo: {
    applicationVersion: "unknown",
    deploymentType: DeploymentType.HELM,
    centralize: true
  },
  environment: {
    id: "1",
    name: "Development",
    type: "Public"
  }
};

export const Default: Story = {
  args: {
    setRefresher: () => {
      return undefined;
    },
    assetTypeId: "Endpoint"
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA,
        payload: mockedAssetsData
      });
    }, 500);
  }
};

export const WithPerformanceImpact: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    setRefresher: () => {
      return undefined;
    },
    assetTypeId: "Endpoint"
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA,
        payload: mockedAssetsData
      });
    }, 500);
  }
};
