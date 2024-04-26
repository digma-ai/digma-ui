import { Meta, StoryObj } from "@storybook/react";
import { Tests } from ".";
import { featureFlagMinBackendVersions } from "../../../featureFlags";
import { FeatureFlag } from "../../../types";
import { actions } from "../../Main/actions";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { DeploymentType } from "../../common/App/types";
import { mockedTestsData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tests> = {
  title: "Highlights/Tests",
  component: Tests,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const mockedConfig = {
  ...initialState,
  backendInfo: {
    applicationVersion:
      featureFlagMinBackendVersions[FeatureFlag.ARE_TESTS_HIGHLIGHTS_ENABLED],
    deploymentType: DeploymentType.HELM,
    centralize: true
  }
};

export const Default: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ],
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_HIGHLIGHTS_TESTS_DATA,
        payload: mockedTestsData
      });
    });
  }
};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export const Disabled: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...mockedConfig,
          backendInfo: {
            ...mockedConfig.backendInfo,
            centralize: false
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
