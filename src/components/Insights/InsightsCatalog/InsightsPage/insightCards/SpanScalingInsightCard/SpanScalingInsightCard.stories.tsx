import type { Meta, StoryObj } from "@storybook/react";
import { SpanScalingInsightCard } from ".";
import {
  mockedSpanScalingInsight,
  ofDbSpan,
  withAffectedEndpoints,
  withRootCause
} from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanScalingInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/insightCards/SpanScalingInsightCard",
  component: SpanScalingInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  args: {
    insight: mockedSpanScalingInsight
  }
};

export const WithEndpointAndRootCause: Story = {
  name: "Endpoint + Root Cause",
  args: {
    insight: { ...mockedSpanScalingInsight, ...withRootCause }
  }
};

export const WithDBSpanAndAffectedEndpoint: Story = {
  name: "DB Span + Affected Endpoint",
  args: {
    insight: {
      ...mockedSpanScalingInsight,
      ...ofDbSpan,
      ...withAffectedEndpoints
    }
  }
};

export const WithDBSpanAndAffectedEndpointAndRootCause: Story = {
  name: "DB Span + Affected Endpoint + Root Cause",
  args: {
    insight: {
      ...mockedSpanScalingInsight,
      ...ofDbSpan,
      ...withAffectedEndpoints,
      ...withRootCause
    }
  }
};
