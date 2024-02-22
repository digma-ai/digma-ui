import { Meta, StoryObj } from "@storybook/react";
import { ScalingIssueInsight } from ".";
import { MockedSpanScalingBadlyInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScalingIssueInsight> = {
  title: "Insights/ScalingIssueInsight",
  component: ScalingIssueInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  args: {
    insight: new MockedSpanScalingBadlyInsight()
  }
};

export const Story2: Story = {
  name: "Endpoint + Root Cause",
  args: {
    insight: new MockedSpanScalingBadlyInsight().withRootCause()
  }
};

export const Story3: Story = {
  name: "DB Span + Affected Endpoint",
  args: {
    insight: new MockedSpanScalingBadlyInsight()
      .ofDbSpan()
      .withAffectedEndpoints()
  }
};

export const Story4: Story = {
  name: "DB Span + Affected Endpoint + Root Cause",
  args: {
    insight: new MockedSpanScalingBadlyInsight()
      .ofDbSpan()
      .withAffectedEndpoints()
      .withRootCause()
  }
};
