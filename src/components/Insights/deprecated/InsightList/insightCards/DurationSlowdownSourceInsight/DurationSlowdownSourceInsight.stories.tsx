import { Meta, StoryObj } from "@storybook/react";
import { DurationSlowdownSourceInsight } from ".";
import { InsightType } from "../../../../../../types";
import { InsightCategory, InsightScope } from "../../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DurationSlowdownSourceInsight> = {
  title:
    "Insights/deprecated/InsightList/insightCards/DurationSlowdownSourceInsight",
  component: DurationSlowdownSourceInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithEvaluatingChange: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cde7979ad6d",
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Endpoint Duration Slowdown Source",
      type: InsightType.EndpointDurationSlowdown,
      category: InsightCategory.Performance,
      specifity: 4,
      importance: 2,
      isDismissed: false,
      isDismissible: true,
      durationSlowdownSources: [
        {
          percentile: "0.5",
          spanInfo: {
            name: "WaitForLock",
            displayName: "WaitForLock",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
            methodCodeObjectId: null,
            kind: "Internal"
          },
          level: 0,
          previousDuration: {
            value: 455.16,
            unit: "ms",
            raw: 455156000
          },
          currentDuration: {
            value: 3.22,
            unit: "sec",
            raw: 3222871000
          },
          changeTime: "2023-06-30T11:09:55.000Z",
          changeVerified: false
        },
        {
          percentile: "0.95",
          spanInfo: {
            name: "WaitForLock",
            displayName: "WaitForLock",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
            methodCodeObjectId: null,
            kind: "Internal"
          },
          level: 0,
          previousDuration: {
            value: 1.6,
            unit: "sec",
            raw: 1604577000
          },
          currentDuration: {
            value: 2.62,
            unit: "sec",
            raw: 2619854000
          },
          changeTime: "2023-06-30T11:09:54.000Z",
          changeVerified: false
        }
      ],
      decorators: [
        {
          title: "Endpoint Duration Slowdown Source",
          description: "Some spans significantly slowdown this endpoint"
        }
      ],
      scope: InsightScope.EntrySpan,
      route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}",
      serviceName: "Sample.MoneyTransfer.API",
      spanInfo: {
        name: "HTTP GET SampleInsights/lock/{milisec}",
        displayName: "HTTP GET SampleInsights/lock/{milisec}",
        instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
        spanCodeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
        methodCodeObjectId:
          "method:Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
        kind: "Server"
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: false,
      customStartTime: null,
      actualStartTime: "2023-06-16T11:10:21.334Z"
    }
  }
};
