import { Meta, StoryObj } from "@storybook/react";
import { Digmathon } from ".";
import { actions } from "../actions";
import { mockedDigmathonProgressData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Digmathon> = {
  title: "Recent Activity/Digmathon",
  component: Digmathon,
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
    setTimeout(() => {
      window.setTimeout(() => {
        window.postMessage({
          type: "digma",
          action: actions.SET_DIGMATHON_PROGRESS_DATA,
          payload: mockedDigmathonProgressData
        });
      });
    }, 0);
  }
};

export const Congratulations: Story = {
  play: () => {
    setTimeout(() => {
      window.setTimeout(() => {
        window.postMessage({
          type: "digma",
          action: actions.SET_DIGMATHON_PROGRESS_DATA,
          payload: {
            ...mockedDigmathonProgressData,
            insights: mockedDigmathonProgressData.insights.map((x) => ({
              ...x,
              isFound: true
            }))
          }
        });
      });
    }, 0);
  }
};
