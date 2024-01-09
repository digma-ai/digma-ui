import { Meta, StoryObj } from "@storybook/react";
import { ScalingIssueInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

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

export const Default: Story = {
  args: {
    insight: {
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Scaling Issue Found",
      type: InsightType.SpanScalingBadly,
      category: InsightCategory.Performance,
      specifity: 4,
      importance: 2,
      spanName: "WaitForLock",
      spanInstrumentationLibrary: "SampleInsightsController",
      turningPointConcurrency: 17,
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
      rootCauseSpans: [],
      affectedEndpoints: [
        {
          route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}",
          serviceName: "Sample.MoneyTransfer.API",
          sampleTraceId: "3E41E4197B696CA9BF1157AEB254DFE0",
          flowHash: "2C8EE08C75056058690249E52382F5",
          name: "HTTP GET SampleInsights/lock/{milisec}",
          displayName: "HTTP GET SampleInsights/lock/{milisec}",
          instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
          spanCodeObjectId:
            "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
          methodCodeObjectId:
            "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
          kind: "Server",
          codeObjectId:
            "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
        }
      ],
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: "Internal",
        codeObjectId: null
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
      prefixedCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
      customStartTime: null,
      actualStartTime: "2023-06-24T00:00:00.000Z",
      flowHash: null
    }
  }
};
