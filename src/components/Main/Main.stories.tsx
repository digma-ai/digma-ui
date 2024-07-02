import { Meta, StoryObj } from "@storybook/react";

import {
  RouterRoute,
  reactRouterParameters
} from "storybook-addon-remix-react-router";
import { Main } from ".";
import { routes } from "../../containers/Main/router";
import { mockedEnvironments } from "../Navigation/EnvironmentBar/mockData";
import { TAB_IDS } from "../Navigation/Tabs/types";
import { ConfigContext, initialState } from "../common/App/ConfigContext";
import { ConfigContextData } from "../common/App/types";

const mockedConfig: ConfigContextData = {
  ...initialState,
  environments: mockedEnvironments
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

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Highlights: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: `/${TAB_IDS.HIGHLIGHTS}` },
      routing: routes as RouterRoute
    })
  }
};

export const Issues: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: `/${TAB_IDS.ISSUES}` },
      routing: routes as RouterRoute
    })
  }
};

export const Assets: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: `/${TAB_IDS.ASSETS}` },
      routing: routes as RouterRoute
    })
  }
};

export const Analytics: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: `/${TAB_IDS.ANALYTICS}` },
      routing: routes as RouterRoute
    })
  }
};

export const Errors: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: `/${TAB_IDS.ERRORS}` },
      routing: routes as RouterRoute
    })
  }
};

export const Tests: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: `/${TAB_IDS.TESTS}` },
      routing: routes as RouterRoute
    })
  }
};
