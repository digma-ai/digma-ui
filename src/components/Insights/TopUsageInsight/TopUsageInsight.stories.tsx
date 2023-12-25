import { Meta, StoryObj } from "@storybook/react";
import { TopUsageInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TopUsageInsight> = {
  title: "Insights/TopUsageInsight",
  component: TopUsageInsight,
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
      criticality: 0,
      firstCommitId: null,
      lastCommitId: null,
      deactivatedCommitId: null,
      impact: 0,
      name: "Top Usage",
      type: InsightType.SpanUsages,
      category: InsightCategory.Usage,
      specifity: 4,
      isRecalculateEnabled: true,
      importance: 5,
      span: "DelayAsync",
      sampleTrace: null,
      flows: [
        {
          sampleTraceIds: ["3E41E4197B696CA9BF1157AEB254DFE0"],
          percentage: 40.15025041736227,
          firstService: {
            service: "Sample.MoneyTransfer.API",
            span: "HTTP GET SampleInsights/lock/{milisec}",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}"
          },
          intermediateSpan: "WaitForLock",
          lastService: null,
          lastServiceSpan: null
        },
        {
          sampleTraceIds: ["3E41E4197B696CA9BF1157AEB254DFE0"],
          percentage: 40.15025041736227,
          firstService: {
            service: "Sample.MoneyTransfer.API",
            span: "HTTP GET SampleInsights/lock/{milisec}",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}"
          },
          intermediateSpan: "Connecting",
          lastService: null,
          lastServiceSpan: null
        },
        {
          sampleTraceIds: ["0DB20449C835447E04F6549627A3999F"],
          percentage: 19.69949916527546,
          firstService: {
            service: "Sample.MoneyTransfer.API",
            span: "HTTP GET SampleInsights/UnverifiedChange/{milisec}",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$UnverifiedChange(Int32)",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/UnverifiedChange/{milisec}"
          },
          intermediateSpan: null,
          lastService: null,
          lastServiceSpan: null
        }
      ],
      scope: InsightScope.Span,
      spanInfo: {
        name: "DelayAsync",
        displayName: "DelayAsync",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
        methodCodeObjectId: null,
        kind: "Internal",
        codeObjectId: null
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId: "SampleInsightsController$_$DelayAsync",
      decorators: null,
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      prefixedCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
      customStartTime: null,
      actualStartTime: "2023-06-17T00:00:00.000Z"
    }
  }
};
