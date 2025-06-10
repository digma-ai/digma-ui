import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Insights } from ".";
import { ConfigContext, initialState } from "../common/App/ConfigContext";
import type { ConfigContextData } from "../common/App/types";
import { actions as globalActions } from "./../../actions";
import { IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY } from "./InsightsCatalog/InsightsPage";

const mockedConfig: ConfigContextData = {
  ...initialState,
  environments: [
    {
      id: "1",
      name: "Development",
      type: "Public"
    }
  ]
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Insights> = {
  title: "Insights/Insights",
  component: Insights,
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

type Story = StoryObj<typeof Insights>;

export const Default: Story = {};

export const Issues: Story = {
  args: {
    insightViewType: "Issues"
  }
};

export const WithJiraHint: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: globalActions.SET_FROM_PERSISTENCE,
        payload: {
          key: IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
          value: {
            value: false
          },
          scope: "application",
          error: null
        }
      });
    }, 500);
  }
};
