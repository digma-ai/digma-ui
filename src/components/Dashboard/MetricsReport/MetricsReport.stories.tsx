import { Meta, StoryObj } from "@storybook/react";

import { MetricsReport } from ".";
import { actions } from "../actions";
import { mockedReport } from "./Table/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MetricsReport> = {
  title: "Dashboard/MetricsReport",
  component: MetricsReport,
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
        action: actions.SET_METRICS_REPORT_DATA,
        payload: { ...mockedReport }
      });
    }, 500);

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_SERVICES,
        payload: ["service 1", "service 2", "service 3", "service 4"]
      });
    }, 500);
  }
};
