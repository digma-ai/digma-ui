import type { Meta, StoryObj } from "@storybook/react";

import { ErrorsList } from ".";
import { actions } from "../actions";
import { mockedErrorsData } from "../mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorsList> = {
  title: "Errors/ErrorsList",
  component: ErrorsList,
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
        action: actions.SET_ERRORS_DATA,
        payload: mockedErrorsData
      });
    }, 1000);
  }
};

export const Empty: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_ERRORS_DATA,
        payload: {
          errors: []
        }
      });
    }, 1000);
  }
};
