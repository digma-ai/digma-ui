import { Meta, StoryObj } from "@storybook/react";
import { SpanBottleneckInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanBottleneckInsight> = {
  title: "Insights/SpanBottleneckInsight",
  component: SpanBottleneckInsight,
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
      name: "Bottleneck Detected",
      type: InsightType.SlowestSpans,
      category: InsightCategory.Performance,
      specifity: 3,
      importance: 2,
      spans: [
        {
          spanInfo: {
            name: "DelayAsync",
            displayName: "DelayAsync",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
            methodCodeObjectId: null,
            kind: "Internal",
            codeObjectId: null
          },
          probabilityOfBeingBottleneck: 0.6923076923076923,
          avgDurationWhenBeingBottleneck: {
            value: 2,
            unit: "sec",
            raw: 2002883447.4474475
          },
          p50: {
            fraction: 0,
            maxDuration: {
              value: 0,
              unit: "ns",
              raw: 0
            }
          },
          p95: {
            fraction: 0,
            maxDuration: {
              value: 0,
              unit: "ns",
              raw: 0
            }
          },
          p99: {
            fraction: 0,
            maxDuration: {
              value: 0,
              unit: "ns",
              raw: 0
            }
          }
        },
        {
          spanInfo: {
            name: "WaitForLock",
            displayName: "WaitForLock",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
            methodCodeObjectId: null,
            kind: "Internal",
            codeObjectId: null
          },
          probabilityOfBeingBottleneck: 0.41995841995842,
          avgDurationWhenBeingBottleneck: {
            value: 4.58,
            unit: "sec",
            raw: 4583302698.019802
          },
          p50: {
            fraction: 0,
            maxDuration: {
              value: 0,
              unit: "ns",
              raw: 0
            }
          },
          p95: {
            fraction: 0,
            maxDuration: {
              value: 0,
              unit: "ns",
              raw: 0
            }
          },
          p99: {
            fraction: 0,
            maxDuration: {
              value: 0,
              unit: "ns",
              raw: 0
            }
          }
        }
      ],
      scope: InsightScope.EntrySpan,
      endpointSpan: "HTTP GET SampleInsights/lock/{milisec}",
      spanCodeObjectId:
        "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
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
        kind: "Server",
        codeObjectId:
          "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "HTTP GET SampleInsights/lock/{milisec}",
        subtitle: "2 spans",
        description: "WaitForLock 4.58 sec"
      },
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      decorators: null,
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: true,
      prefixedCodeObjectId:
        "method:Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
      customStartTime: null,
      actualStartTime: "2023-06-16T11:10:30.349Z"
    }
  }
};
