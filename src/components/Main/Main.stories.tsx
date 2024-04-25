import { Meta, StoryObj } from "@storybook/react";

import { Main } from ".";
import { ROUTES } from "../../constants";
import { mockedViewsData } from "../Navigation/mockData";
import { SetViewsPayload } from "../Navigation/types";
import { actions } from "./actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Main> = {
  title: "Main/Main",
  component: Main,
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
    window.postMessage({
      type: "digma",
      action: actions.SET_VIEWS,
      payload: updateSelectedView(mockedViewsData, ROUTES.HIGHLIGHTS)
    });
  }
};

export const Insights: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: actions.SET_VIEWS,
      payload: updateSelectedView(mockedViewsData, ROUTES.INSIGHTS)
    });
  }
};

export const Assets: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: actions.SET_VIEWS,
      payload: updateSelectedView(mockedViewsData, ROUTES.ASSETS)
    });
  }
};

export const Analytics: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: actions.SET_VIEWS,
      payload: updateSelectedView(mockedViewsData, ROUTES.ANALYTICS)
    });
  }
};

export const Tests: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: actions.SET_VIEWS,
      payload: updateSelectedView(mockedViewsData, ROUTES.TESTS)
    });
  }
};
