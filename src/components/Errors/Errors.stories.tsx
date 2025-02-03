import type { Meta, StoryObj } from "@storybook/react";
import { Errors } from ".";
import { ConfigContext, initialState } from "../common/App/ConfigContext";
import type { ConfigContextData } from "../common/App/types";
import { mockedErrorDetails } from "./ErrorDetails/mockData";
import { actions } from "./actions";
import { mockedErrorsData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const mockedConfig: ConfigContextData = {
  ...initialState,
  scope: {
    span: {
      spanCodeObjectId: "spanCodeObjectId",
      methodId: "methodId",
      displayName: "displayName",
      role: "Entry",
      serviceName: "serviceName"
    },
    hasErrors: true,
    issuesInsightsCount: 1,
    analyticsInsightsCount: 1,
    unreadInsightsCount: 1,
    code: {
      codeDetailsList: [],
      relatedCodeDetailsList: []
    }
  }
};

const meta: Meta<typeof Errors> = {
  title: "Errors/Errors",
  component: Errors,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ErrorsList: Story = {
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

export const ErrorDetails: Story = {
  args: {
    errorId: "1"
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_ERROR_DETAILS,
        payload: mockedErrorDetails
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
