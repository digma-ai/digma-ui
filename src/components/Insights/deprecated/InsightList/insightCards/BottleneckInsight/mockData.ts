import { InsightType } from "../../../../../../types";
import {
  InsightCategory,
  InsightScope,
  SpanEndpointBottleneckInsight
} from "../../../../types";

export const mockedBottleneckInsight: SpanEndpointBottleneckInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-4c5d-9628-1cce7979ac6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0.7,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Bottleneck",
  type: InsightType.SpanEndpointBottleneck,
  category: InsightCategory.Performance,
  specifity: 3,
  importance: 2,
  isDismissed: false,
  isDismissible: true,
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
      traceId: "traceId",
      probabilityOfBeingBottleneck: 0.36877828054298645,
      avgFractionWhenBeingBottleneck: 50,
      avgDurationWhenBeingBottleneck: {
        value: 3.89,
        unit: "sec",
        raw: 3887134558.2822084
      },
      impact: 0.14877828054298645,
      severity: 0.2877828054298645,
      criticality: 0.5687782805429865,
      requestPercentage: 35
    }
  ],
  scope: InsightScope.Span,
  spanInfo: {
    name: "WaitForLock",
    displayName: "WaitForLock",
    instrumentationLibrary: "SampleInsightsController",
    spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
    methodCodeObjectId: null,
    kind: null
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
  customStartTime: null,
  actualStartTime: "2023-06-16T11:10:20.088Z"
};
