import { Meta, StoryObj } from "@storybook/react";
import { InsightsCatalog } from ".";
import { SORTING_ORDER } from "../../common/SortingSelector/types";
import { mockedSpanBottleneckInsight } from "../common/insights/EndpointBottleneckInsight/mockData";
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
    insights: [{ ...mockedSpanBottleneckInsight, isRead: false }],
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
      showUnreadOnly: false
    },
    isDismissalEnabled: true,
    unreadCount: 1,
    isMarkingAsReadEnabled: true
  }
};
