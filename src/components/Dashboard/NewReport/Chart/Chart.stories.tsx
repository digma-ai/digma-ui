import { Meta, StoryObj } from "@storybook/react";

import { Chart } from ".";
import { mockedReport } from "../MetricsTable/mockData";
import { transformServicesData } from "../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Chart> = {
  title: "Dashboard/NewReport/Chart",
  component: Chart,
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
    scoreCriterion: "criticality",
    timeMode: "baseline",
    viewLevel: "services",
    onTitleClick: () => {
      return undefined;
    },
    data: transformServicesData(mockedReport.reports, "criticality")
  }
};
