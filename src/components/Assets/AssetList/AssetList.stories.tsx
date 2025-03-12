import type { Meta, StoryObj } from "@storybook/react";
import { AssetList } from ".";
import { AssetType } from "../../../redux/services/types";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import type { ConfigContextData } from "../../common/App/types";
import { DeploymentType } from "../../common/App/types";

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
    deploymentType: DeploymentType.Helm,
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
    assetTypeId: AssetType.Endpoint
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
    assetTypeId: AssetType.Endpoint
  }
};
