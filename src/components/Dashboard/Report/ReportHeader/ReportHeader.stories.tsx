import { Meta, StoryObj } from "@storybook/react";

import { ReportHeader } from ".";
import { actions } from "../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ReportHeader> = {
  title: "Dashboard/Report/ReportHeader",
  component: ReportHeader,
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
        action: actions.SET_SERVICES,
        payload: ["service 1", "service 2", "service 3", "service 4"]
      });
    }, 500);
  }
};
