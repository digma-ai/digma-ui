import type { SpanUsagesInsight } from "../../../../../types";
import {
  InsightCategory,
  InsightScope,
  InsightType
} from "../../../../../types";

export const mockedSpanUsagesInsight: SpanUsagesInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8162-4c5d-9628-7cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Top Usage",
  type: InsightType.SpanUsages,
  category: InsightCategory.Usage,
  specifity: 4,
  isRecalculateEnabled: true,
  importance: 5,
  sampleTrace: null,
  isDismissed: false,
  isDismissible: false,
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
    kind: "Internal"
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
  customStartTime: null,
  actualStartTime: "2023-06-17T00:00:00.000Z"
};
