import type { Meta, StoryObj } from "@storybook/react";
import { Report } from ".";
import { actions as globalActions } from "../../../actions";
import { actions } from "../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Report> = {
  title: "Dashboard/Report",
  component: Report,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof Report>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_REPORT_ASSETS_STATS,
        payload: {
          totalCount: 10,
          data: [
            {
              name: "Endpoint",
              count: 1
            },
            {
              name: "DatabaseQueries",
              count: 2
            },
            {
              name: "Consumer",
              count: 3
            },
            {
              name: "EndpointClient",
              count: 4
            },
            {
              name: "CodeLocation",
              count: 5
            },
            {
              name: "Cache",
              count: 6
            },
            {
              name: "Other",
              count: 7
            }
          ]
        }
      });
    }, 500);

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_REPORT_ISSUES_STATS,
        payload: {
          totalCount: 10,
          fixedCount: 9,
          activeCount: 8,
          regressionCount: 7,
          criticalCount: 6
        }
      });
    }, 500);

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_SERVICES,
        payload: ["service 1", "service 2", "service 3", "service 4"]
      });
    }, 500);

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: globalActions.SET_ENVIRONMENTS,
        payload: [
          {
            id: "test1",
            name: "test1",
            type: "Public"
          },
          {
            id: "test2",
            name: "test2",
            type: "Public"
          }
        ]
      });
    }, 500);
  }
};
