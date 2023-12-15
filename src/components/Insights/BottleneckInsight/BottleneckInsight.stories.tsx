import { Meta, StoryObj } from "@storybook/react";
import { BottleneckInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BottleneckInsight> = {
  title: "Insights/BottleneckInsight",
  component: BottleneckInsight,
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
      impact: 0,
      name: "Bottleneck",
      type: InsightType.SpanEndpointBottleneck,
      category: InsightCategory.Performance,
      specifity: 3,
      importance: 2,
      span: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      slowEndpoints: [
        {
          endpointInfo: {
            route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}",
            instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
            serviceName: "Sample.MoneyTransfer.API",
            codeObjectId:
              "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
            spanCodeObjectId:
              "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
            spanName: "HTTP GET SampleInsights/lock/{milisec}"
          },
          probabilityOfBeingBottleneck: 0.36877828054298645,
          avgDurationWhenBeingBottleneck: {
            value: 3.89,
            unit: "sec",
            raw: 3887134558.2822084
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
      },
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock",
      decorators: [
        {
          title: "Bottleneck",
          description: "Significant portion of traces spent here"
        }
      ],
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: false,
      prefixedCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
      customStartTime: null,
      actualStartTime: "2023-06-16T11:10:20.088Z"
    }
  }
};
