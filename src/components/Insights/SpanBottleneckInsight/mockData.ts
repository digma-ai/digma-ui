import { InsightType } from "../../../types";
import {
  EndpointSlowestSpansInsight,
  InsightCategory,
  InsightScope
} from "../types";

export const mockedSpanBottleneckInsight: EndpointSlowestSpansInsight = {
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  impact: 0,
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
      criticality: 0,
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
      criticality: 0,
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
};
