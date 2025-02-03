import type { Meta, StoryObj } from "@storybook/react";
import { Highlights } from ".";
import { featureFlagMinBackendVersions } from "../../featureFlags";
import { FeatureFlag } from "../../types";
import { actions as mainActions } from "../Main/actions";
import { ConfigContext, initialState } from "../common/App/ConfigContext";
import { DeploymentType } from "../common/App/types";
import { mockedImpactData } from "./Impact/mockData";
import { mockedPerformanceData } from "./Performance/mockData";
import { mockedScalingData } from "./Scaling/mockData";
import { mockedTopIssuesData } from "./TopIssues/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const mockedConfig = {
  ...initialState,
  backendInfo: {
    applicationVersion:
      featureFlagMinBackendVersions[FeatureFlag.IS_HIGHLIGHTS_SCALING_ENABLED],
    deploymentType: DeploymentType.HELM,
    centralize: true
  }
};

const meta: Meta<typeof Highlights> = {
  title: "Highlights/Highlights",
  component: Highlights,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
        action: mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
        payload: mockedTopIssuesData
      });
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_PERFORMANCE_DATA,
        payload: mockedPerformanceData
      });
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_IMPACT_DATA,
        payload: mockedImpactData
      });
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: mockedScalingData
      });
    }, 1000);
  }
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
        action: mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
        payload: { topInsights: [] }
      });
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_PERFORMANCE_DATA,
        payload: { performance: [] }
      });
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_IMPACT_DATA,
        payload: { impactHighlights: [] }
      });
      window.postMessage({
        type: "digma",
        action: mainActions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: { scaling: [] }
      });
    }, 1000);
  }
};
