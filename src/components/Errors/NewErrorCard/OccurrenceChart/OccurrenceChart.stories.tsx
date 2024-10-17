import { Meta, StoryObj } from "@storybook/react";

import { OccurrenceChart } from ".";
import { actions } from "../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof OccurrenceChart> = {
  title: "Errors/NewErrorCard/OccurrenceChart",
  component: OccurrenceChart,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_ERROR_TIME_SERIES_DATA,
        payload: {
          dailyOccurrence: [
            {
              date: "2024-10-17T00:00:00",
              value: 15
            },
            {
              date: "2024-10-18T00:00:00",
              value: 10
            },
            {
              date: "2024-10-19T00:00:00",
              value: 5
            },
            {
              date: "2024-10-20T00:00:00",
              value: 20
            },
            {
              date: "2024-10-21T00:00:00",
              value: 25
            },
            {
              date: "2024-10-22T00:00:00",
              value: 30
            },
            {
              date: "2024-10-23T00:00:00",
              value: 35
            },
            {
              date: "2024-10-24T00:00:00",
              value: 40
            },
            {
              date: "2024-10-25T00:00:00",
              value: 45
            },
            {
              date: "2024-10-26T00:00:00",
              value: 50
            }
          ]
        }
      });
    }, 500);
  }
};
