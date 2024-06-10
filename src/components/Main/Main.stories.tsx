import { Meta, StoryObj } from "@storybook/react";

import { Main } from ".";
import { ROUTES } from "../../constants";
import { actions as navigationActions } from "../Navigation/actions";
import { mockedViewsData } from "../Navigation/mockData";
import { SetViewsPayload } from "../Navigation/types";
import { ConfigContext, initialState } from "../common/App/ConfigContext";
import { ConfigContextData } from "../common/App/types";
import { actions } from "./actions";

const mockedConfig: ConfigContextData = {
  ...initialState,
  environments: [
    {
      id: "Development",
      name: "Development",
      type: "Public"
    },
    {
      id: "Testing",
      name: "Testing",
      type: "Public"
    },
    {
      id: "Staging",
      name: "Staging",
      type: "Public"
    },
    {
      id: "Production",
      name: "Production",
      type: "Public"
    }
  ]
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Main> = {
  title: "Main/Main",
  component: Main,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const updateSelectedView = (
  data: SetViewsPayload,
  viewId: string
): SetViewsPayload => {
  return {
    ...data,
    views: data.views.map((view) =>
      view.id === viewId
        ? { ...view, isSelected: true }
        : { ...view, isSelected: false }
    )
  };
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Highlights: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: navigationActions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.HIGHLIGHTS)
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.HIGHLIGHTS)
      });
    }, 0);
  }
};

export const Insights: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: navigationActions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.INSIGHTS)
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.INSIGHTS)
      });
    }, 0);
  }
};

export const Assets: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: navigationActions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.ASSETS)
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.ASSETS)
      });
    }, 0);
  }
};

export const Analytics: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: navigationActions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.ANALYTICS)
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.ANALYTICS)
      });
    }, 0);
  }
};

export const Errors: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: navigationActions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.ERRORS)
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.ERRORS)
      });
    }, 0);
  }
};

export const Tests: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: navigationActions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.TESTS)
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_VIEWS,
        payload: updateSelectedView(mockedViewsData, ROUTES.TESTS)
      });
    }, 0);
  }
};
