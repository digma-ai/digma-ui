import {
  InsightCategory,
  InsightScope,
  InsightType,
  SlowEndpointInsight
} from "../../../../types";

export const mockedSlowEndpointInsight: SlowEndpointInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
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
  isDismissed: false,
  isDismissible: true,
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
  scope: InsightScope.EntrySpan,
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
    kind: "Server"
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
  customStartTime: null,
  actualStartTime: "2023-06-16T11:10:29.277Z"
};
