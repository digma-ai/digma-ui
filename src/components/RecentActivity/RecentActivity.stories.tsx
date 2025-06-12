import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RecentActivity } from ".";
import { actions as globalActions } from "../../actions";
import { mockedDigmathonProgressData } from "./Digmathon/mockData";
import { mockData as liveData } from "./LiveView/mockData";
import { actions } from "./actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RecentActivity> = {
  title: "Recent Activity/RecentActivity",
  component: RecentActivity,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof RecentActivity>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const NoData: Story = {};

export const WithLiveData: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_LIVE_DATA,
        payload: liveData
      });
    }, 0);
  }
};

export const WithNoLiveData: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_LIVE_DATA,
        payload: {
          ...liveData,
          liveDataRecords: []
        }
      });
    }, 0);
  }
};

export const OpenRegistrationDialog: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: actions.OPEN_REGISTRATION_DIALOG
    });
  }
};

export const EnableDigmathonMode: Story = {
  play: () => {
    window.postMessage({
      type: "digma",
      action: globalActions.SET_DIGMATHON_MODE,
      payload: {
        isDigmathonModeEnabled: true
      }
    });
    window.postMessage({
      type: "digma",
      action: globalActions.SET_PRODUCT_KEY,
      payload: {
        productKey: "digmathon"
      }
    });
    window.postMessage({
      type: "digma",
      action: actions.SET_DIGMATHON_PROGRESS_DATA,
      payload: {
        ...mockedDigmathonProgressData,
        insights: mockedDigmathonProgressData.insights.slice(0, 4)
      }
    });
  }
};

export const OpenCongratulationsDigmathonView: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DIGMATHON_PROGRESS_DATA,
        payload: mockedDigmathonProgressData
      });
    }, 0);
  }
};
