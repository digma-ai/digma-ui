import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointUsageInsightCard } from ".";
import { InsightType } from "../../../../../../../types";
import { InsightImportance } from "../../../../../types";
import { mockedEndpointNormalUsageInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointUsageInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointUsageInsightCard",
  component: EndpointUsageInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointUsageInsightCard>;

export const LowUsage: Story = {
  args: {
    insight: {
      ...mockedEndpointNormalUsageInsight,
      name: "Low Usage",
      type: InsightType.LowUsage,
      importance: InsightImportance.Info,
      decorators: [
        {
          title: "Low Usage",
          description: "Low level of usage for this endpoint"
        }
      ]
    }
  }
};

export const NormalUsage: Story = {
  args: {
    insight: mockedEndpointNormalUsageInsight
  }
};

export const HighUsage: Story = {
  args: {
    insight: {
      ...mockedEndpointNormalUsageInsight,
      name: "High Usage",
      type: InsightType.HighUsage,
      importance: InsightImportance.Interesting,
      decorators: [
        {
          title: "High Usage",
          description: "High level of usage for this endpoint"
        }
      ]
    }
  }
};
