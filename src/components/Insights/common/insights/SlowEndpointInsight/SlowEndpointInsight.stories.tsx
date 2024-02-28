import { Meta, StoryObj } from "@storybook/react";
import { SlowEndpointInsight } from ".";
import { InsightCategory, InsightScope, InsightType } from "../../../types";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SlowEndpointInsight> = {
  title: "Insights/common/insights/SlowEndpointInsight",
  component: SlowEndpointInsight,
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
      id: "60b55792-8262-4c3d-9628-7cce7979ad6d",
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Slow Endpoint",
      type: InsightType.SlowEndpoint,
      category: InsightCategory.Performance,
      specifity: 5,
      importance: 2,
      decorators: [
        {
          title: "Slow Endpoint",
          description: "Endpoint slow performance"
        }
      ],
      endpointsMedian: {
        value: 2.21,
        unit: "sec",
        raw: 2209365000
      },
      endpointsMedianOfMedians: {
        value: 1.6,
        unit: "sec",
        raw: 1601240200
      },
      endpointsP75: {
        value: 3.85,
        unit: "sec",
        raw: 3851011500
      },
      median: {
        value: 5.01,
        unit: "sec",
        raw: 5007013000
      },
      endpointsMedianOfP75: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      min: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      max: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      mean: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      p75: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      p95: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      p99: {
        value: 0,
        unit: "ns",
        raw: 0
      },
      scope: InsightScope.EntrySpan,
      endpointSpan: "HTTP GET SampleInsights/SlowEndpoint",
      spanCodeObjectId:
        "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/SlowEndpoint",
      route: "epHTTP:HTTP GET SampleInsights/SlowEndpoint",
      serviceName: "Sample.MoneyTransfer.API",
      spanInfo: {
        name: "HTTP GET SampleInsights/SlowEndpoint",
        displayName: "HTTP GET SampleInsights/SlowEndpoint",
        instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
        spanCodeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/SlowEndpoint",
        methodCodeObjectId:
          "method:Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$SlowEndpoint(Int32)",
        kind: "Server",
        codeObjectId:
          "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$SlowEndpoint(Int32)"
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "HTTP GET SampleInsights/SlowEndpoint",
        subtitle: "",
        description: "Median duration 5.01 sec"
      },
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$SlowEndpoint(Int32)",
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: false,
      prefixedCodeObjectId:
        "method:Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$SlowEndpoint(Int32)",
      customStartTime: null,
      actualStartTime: "2023-06-16T11:10:29.277Z"
    }
  }
};
