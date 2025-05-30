import { InsightType } from "../../../../../../../types";
import type { EndpointNormalUsageInsight } from "../../../../../types";
import { InsightCategory, InsightScope } from "../../../../../types";

export const mockedEndpointNormalUsageInsight: EndpointNormalUsageInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-3c5d-9628-7cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
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
  actualStartTime: "2023-06-16T11:10:22.773Z",
  isDismissed: false,
  isDismissible: true,
  decorators: [
    {
      title: "Normal Usage",
      description: "Normal level of usage for this endpoint"
    }
  ],
  category: InsightCategory.Usage,
  type: InsightType.NormalUsage,
  importance: 7,
  name: "Normal Usage",
  maxCallsIn1Min: 0,
  specifity: 4
};
