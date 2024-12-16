import type { EndpointBottleneckInsight } from "../../../../types";
import { InsightCategory, InsightScope, InsightType } from "../../../../types";

export const mockedEndpointBottleneckInsight: EndpointBottleneckInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-4c5d-9628-7dce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0.7,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Bottleneck Detected",
  type: InsightType.EndpointBottleneck,
  category: InsightCategory.Performance,
  specifity: 3,
  importance: 2,
  isDismissed: false,
  isDismissible: true,
  span: {
    traceId: "traceId",
    spanInfo: {
      name: "DelayAsync",
      displayName: "DelayAsync",
      instrumentationLibrary: "SampleInsightsController",
      spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
      methodCodeObjectId: null,
      kind: "Internal"
    },
    probabilityOfBeingBottleneck: 0.6923076923076923,
    avgFractionWhenBeingBottleneck: 50,
    avgDurationWhenBeingBottleneck: {
      value: 2,
      unit: "sec",
      raw: 2002883447.4474475
    },
    criticality: 0,
    ticketLink: "https://digma.ai/1",
    requestPercentage: 90
  },
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
  customStartTime: null,
  actualStartTime: "2023-06-16T11:10:30.349Z"
};
