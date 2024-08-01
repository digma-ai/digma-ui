import { Meta, StoryObj } from "@storybook/react";
import { IssueCompactCard } from ".";
import { mockedEndpointSpanNPlusOneInsight } from "../../EndpointSpanNPlusOneInsightInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IssueCompactCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/common/IssueCompactCard",
  component: IssueCompactCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: true
    },
    metric: "Metric"
  }
};

export const Unread: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: false
    },
    metric: "Metric"
  }
};

export const Critical: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      criticality: 0.9,
      isRead: false
    },
    isCritical: true,
    metric: "Metric"
  }
};

export const CriticalUnread: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      criticality: 0.9,
      isRead: true
    },
    isCritical: true,
    metric: "Metric"
  }
};
