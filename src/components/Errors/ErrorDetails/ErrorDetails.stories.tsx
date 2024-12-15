import type { Meta, StoryObj } from "@storybook/react";

import { ErrorDetails } from ".";
import { actions } from "../actions";
import { mockedErrorDetails } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorDetails> = {
  title: "Errors/ErrorDetails",
  component: ErrorDetails,
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
        action: actions.SET_ERROR_DETAILS,
        payload: mockedErrorDetails
      });
    }, 1000);
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_FILES_URIS,
        payload: {
          filesURIs: {
            codeObjectId1: "file://path/to/file1"
          }
        }
      });
    }, 2000);
  }
};
