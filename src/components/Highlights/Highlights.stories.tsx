import { Meta, StoryObj } from "@storybook/react";

import { Highlights } from ".";
import { actions as mainActions } from "../Main/actions";
import { mockedImpactData } from "./Impact/mockData";
import { mockedPerformanceData } from "./Performance/mockData";
import { mockedTopIssuesData } from "./TopIssues/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Highlights> = {
  title: "Highlights/Highlights",
  component: Highlights,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
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
    }, 1000);
  }
};

export const Empty: Story = {
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
    }, 1000);
  }
};
