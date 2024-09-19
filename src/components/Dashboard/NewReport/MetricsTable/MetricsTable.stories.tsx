import { Meta, StoryObj } from "@storybook/react";

import { MetricsTable } from ".";
import { mockedReport } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MetricsTable> = {
  title: "Dashboard/NewReport/MetricsTable",
  component: MetricsTable,
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
    data: mockedReport.reports
  }
};

export const Empty: Story = {
  args: {
    data: []
  }
};