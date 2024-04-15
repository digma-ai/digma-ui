import { Meta, StoryObj } from "@storybook/react";
import { NoScalingIssueInsight } from ".";
import { InsightType } from "../../../../../../types";
import { InsightCategory, InsightScope } from "../../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NoScalingIssueInsight> = {
  title: "Insights/deprecated/InsightList/insightCards/NoScalingIssueInsight",
  component: NoScalingIssueInsight,
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
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c7d-9628-7cce7979ad6d",
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Scaling Well",
      type: InsightType.SpanScalingWell,
      category: InsightCategory.Performance,
      specifity: 4,
      importance: 5,
      isDismissed: false,
      isDismissible: true,
      maxConcurrency: 24,
      minDuration: {
        value: 100.67,
        unit: "ms",
        raw: 100671312.5
      },
      maxDuration: {
        value: 7.22,
        unit: "sec",
        raw: 7222044625
      },
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: "Internal"
      },
      shortDisplayInfo: {
        title: "Scaling Issue Found",
        targetDisplayName: "",
        subtitle: "",
        description:
          "Significant performance degradation at 17 executions/second"
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock",
      decorators: [
        {
          title: "Scaling badly",
          description:
            "This code experiences exponential grows in duration after 17 concurrent executions"
        }
      ],
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: false,
      customStartTime: null,
      actualStartTime: "2023-06-24T00:00:00.000Z",
      flowHash: null
    }
  }
};
