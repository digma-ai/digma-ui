import { Meta, StoryObj } from "@storybook/react";

import { Scaling } from ".";
import { actions } from "../../Main/actions";
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

export const Default: Story = {
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

export const Loading: Story = {};

export const Empty: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_HIGHLIGHTS_SCALING_DATA,
        payload: { scaling: [] }
      });
    });
  }
};
