import type { Meta, StoryObj } from "@storybook/react";

import { Impact } from ".";
import { featureFlagMinBackendVersions } from "../../../featureFlags";
import { FeatureFlag } from "../../../types";
import { actions } from "../../Main/actions";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { DeploymentType } from "../../common/App/types";
import { mockedImpactData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Impact> = {
  title: "Highlights/Impact",
  component: Impact,
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
      featureFlagMinBackendVersions[FeatureFlag.IS_HIGHLIGHTS_IMPACT_ENABLED],
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
        action: actions.SET_HIGHLIGHTS_IMPACT_DATA,
        payload: mockedImpactData
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

export const Empty: Story = {
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
        action: actions.SET_HIGHLIGHTS_IMPACT_DATA,
        payload: { impactHighlights: [] }
      });
    });
  }
};

export const Locked: Story = {
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
