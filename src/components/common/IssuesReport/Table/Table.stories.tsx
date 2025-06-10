import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Table } from ".";
import { transformServicesData } from "../utils";
import { mockedReport } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Table> = {
  title: "common/IssuesReport/Table",
  component: Table,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Table>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    data: transformServicesData(mockedReport.reports, "criticality"),
    viewLevel: "services",
    scoreCriterion: "criticality",
    timeMode: "baseline"
  }
};

export const Empty: Story = {
  args: {
    data: [],
    viewLevel: "services",
    scoreCriterion: "criticality",
    timeMode: "baseline"
  }
};
