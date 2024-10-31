import { Meta, StoryObj } from "@storybook/react";

import { IssuesFilter } from ".";
import { actions } from "../../../Issues/actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IssuesFilter> = {
  title: "Insights/Issues/InsightsCatalog/FilterPanel/IssuesFilter",
  component: IssuesFilter,
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
        action: actions.SET_FILTERS,
        payload: {
          issueTypeFilters: [
            {
              enabled: true,
              name: "SlowEndpoint"
            },
            {
              enabled: true,
              name: "NPlusOne"
            },
            {
              enabled: false,
              name: "ChattyApi"
            }
          ],
          services: ["service-one", "service-two"]
        }
      });
    }, 0);
  }
};
