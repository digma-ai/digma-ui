import { Meta, StoryObj } from "@storybook/react";

import { Header } from ".";
import { actions as globalActions } from "../../../../actions";
import { actions } from "../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Header> = {
  title: "Dashboard/MetricsReport/Header",
  component: Header,
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
        action: globalActions.SET_ENVIRONMENTS,
        payload: [
          {
            id: "test1",
            name: "test1",
            type: "Public"
          },
          {
            id: "test2",
            name: "test2",
            type: "Public"
          }
        ]
      });
    }, 500);
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_SERVICES,
        payload: ["service 3", "service 1", "service 2", "service 4"]
      });
    }, 500);
  }
};
