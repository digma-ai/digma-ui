import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Digmathon } from ".";
import { actions } from "../actions";
import { useDigmathonProgressData } from "../useDigmathonProgressData";
import { mockedDigmathonProgressData } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Digmathon> = {
  title: "Recent Activity/Digmathon",
  component: Digmathon,
  decorators: [
    () => {
      const { data, getData, foundIssuesCount, isDigmathonCompleted } =
        useDigmathonProgressData();

      return (
        <Digmathon
          data={data}
          getData={getData}
          foundIssuesCount={foundIssuesCount}
          isDigmathonCompleted={isDigmathonCompleted}
          onGoBack={() => {
            return undefined;
          }}
        />
      );
    }
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Digmathon>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DIGMATHON_PROGRESS_DATA,
        payload: {
          ...mockedDigmathonProgressData,
          insights: mockedDigmathonProgressData.insights.slice(0, 4)
        }
      });
    }, 0);
  }
};

export const HasNewData: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DIGMATHON_PROGRESS_DATA,
        payload: {
          ...mockedDigmathonProgressData,
          insights: mockedDigmathonProgressData.insights.slice(0, 4)
        }
      });
    }, 0);

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DIGMATHON_PROGRESS_DATA,
        payload: {
          ...mockedDigmathonProgressData,
          insights: mockedDigmathonProgressData.insights.slice(0, 6),
          lastUpdatedByUserAt: "2023-01-05T13:14:47.010Z"
        }
      });
    }, 1000);
  }
};

export const Congratulations: Story = {};
