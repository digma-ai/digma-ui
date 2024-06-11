import { Meta, StoryObj } from "@storybook/react";
import { InsightsCatalog } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { SORTING_ORDER } from "../../common/SortingSelector/types";
import { mockedEndpointBottleneckInsight } from "./InsightsPage/insightCards/EndpointBottleneckInsightCard/mockData";
import { mockedSpanDurationsInsight } from "./InsightsPage/insightCards/SpanDurationsInsightCard/mockData";
import { SORTING_CRITERION } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightsCatalog> = {
  title: "Insights/InsightsCatalog",
  component: InsightsCatalog,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onQueryChange: () => {
      /*some spy */
    },
    insights: [
      { ...mockedEndpointBottleneckInsight, isRead: false },
      {
        ...mockedSpanDurationsInsight,
        average: {
          value: 110.74,
          unit: "ms",
          raw: 110735000
        },
        standardDeviation: {
          value: 12.55,
          unit: "ms",
          raw: 12548500
        }
      }
    ],
    totalCount: 1,
    dismissedCount: 1,
    defaultQuery: {
      page: 0,
      sorting: {
        criterion: SORTING_CRITERION.LATEST,
        order: SORTING_ORDER.DESC
      },
      searchQuery: null,
      showDismissed: false,
      insightViewType: "Issues",
      showUnreadOnly: false,
      filters: []
    },
    isDismissalEnabled: true,
    unreadCount: 1,
    isMarkingAsReadEnabled: true
  }
};

export const WithStats = {
  ...Default,
  decorators: [
    (Story: any) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          insightStats: {
            allIssuesCount: 100,
            criticalInsightsCount: 5,
            issuesInsightsCount: 14,
            unreadInsightsCount: 20,
            analyticsInsightsCount: 10,
            scope: null
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
