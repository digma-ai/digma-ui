import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EndpointBreakdownInsightCard } from ".";
import { ComponentType } from "../../../../../types";
import { mockedEndpointBreakdownInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointBreakdownInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/EndpointBreakdownInsightCard",
  component: EndpointBreakdownInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof EndpointBreakdownInsightCard>;

export const Default: Story = {
  args: {
    insight: mockedEndpointBreakdownInsight
  }
};

export const Async: Story = {
  args: {
    insight: {
      ...mockedEndpointBreakdownInsight,
      p50Components: [
        {
          type: ComponentType.Internal,
          fraction: 0.996539483729232,
          duration: {
            value: 2.06,
            unit: "ms",
            raw: 2063332.9999999993
          }
        },
        {
          type: ComponentType.Rendering,
          fraction: 0.0034605162707679665,
          duration: {
            value: 1.03,
            unit: "ms",
            raw: 1031666.4999999995
          }
        }
      ],
      p95Components: [
        {
          type: ComponentType.Internal,
          fraction: 0.996539483729232,
          duration: {
            value: 1.06,
            unit: "ms",
            raw: 1063332.9999999993
          }
        },
        {
          type: ComponentType.Rendering,
          fraction: 0.0034605162707679665,
          duration: {
            value: 2.03,
            unit: "ms",
            raw: 2031666.4999999995
          }
        }
      ],
      hasAsyncSpans: true
    }
  }
};
