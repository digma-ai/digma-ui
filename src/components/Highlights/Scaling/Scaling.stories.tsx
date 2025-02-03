import type { Meta, StoryObj } from "@storybook/react";
import { Scaling } from ".";
import { featureFlagMinBackendVersions } from "../../../featureFlags";
import { FeatureFlag } from "../../../types";
import { actions } from "../../Main/actions";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { DeploymentType } from "../../common/App/types";
import { mockedScalingData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Scaling> = {
  title: "Highlights/Scaling",
  component: Scaling,
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

export const NoData: Story = {
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
        action: actions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: { ...mockedScalingData, dataState: "NoData" }
      });
    });
  }
};

export const PartialData: Story = {
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
        action: actions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: { ...mockedScalingData, dataState: "Partial" }
      });
    });
  }
};

export const ScalingWell: Story = {
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
        action: actions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: { ...mockedScalingData, dataState: "ScalingWell" }
      });
    });
  }
};

export const ScalingBadly: Story = {
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
        action: actions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: mockedScalingData
      });
    });
  }
};
