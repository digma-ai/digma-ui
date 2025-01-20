import type { Meta, StoryObj } from "@storybook/react";
import { InsightStatusTooltipContent } from ".";
import { InsightStatus } from "../../../../../../../../types";
import { mockedEndpointSpanNPlusOneInsight } from "../../../../EndpointSpanNPlusOneInsightInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightStatusTooltipContent> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard/InsightHeader/InsightStatusTooltipContent",
  component: InsightStatusTooltipContent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    insight: mockedEndpointSpanNPlusOneInsight
  }
};

export const Regression: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      status: InsightStatus.Regression
    }
  }
};

export const PossiblyFixed: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      status: InsightStatus.PossiblyFixed
    }
  }
};
