import { InsightType } from "../../../../../../../types";
import type { SpanPerformanceAnomalyInsight } from "../../../../../types";
import {
  InsightCategory,
  InsightScope,
  InsightStatus
} from "../../../../../types";

export const mockedSpanPerformanceAnomalyInsight: SpanPerformanceAnomalyInsight =
  {
    name: "Performance Anomaly",
    category: InsightCategory.Performance,
    specifity: 4,
    isRecalculateEnabled: true,
    importance: 2,
    p50: {
      value: 112.94,
      unit: "ms",
      raw: 112944900
    },
    p95: {
      value: 1.28,
      unit: "sec",
      raw: 1283027500
    },
    slowerByPercentage: 1135.976480567073,
    p50TraceId: "2239C9C15845A34E6F6E735048D8D697",
    p95TraceId: "2239C9C15845A34E6F6E735048D8D697",
    scope: InsightScope.Span,
    spanInfo: {
      uid: "5ffb43b2-dd9e-11ef-b7cf-4669405db3a3",
      name: "SpanWithPerformanceAnomaly",
      displayName: "SpanWithPerformanceAnomaly",
      instrumentationLibrary: "SampleInsightsController",
      spanCodeObjectId:
        "span:SampleInsightsController$_$SpanWithPerformanceAnomaly",
      methodCodeObjectId: null,
      kind: "Internal"
    },
    codeObjectId: "span:SampleInsightsController$_$SpanWithPerformanceAnomaly",
    id: "69ecbfd6-dd9e-11ef-8928-4669405db3a3",
    shortDisplayInfo: {
      title: "",
      targetDisplayName: "",
      subtitle: "",
      description: ""
    },
    decorators: null,
    environment: "ANOMALY-DIGMA#ID#817E16AB-62A7-45D8-8240-5532C61A8DFC",
    severity: 0.5,
    impact: 0,
    criticality: 0.5,
    reopenCount: 0,
    ticketLink: null,
    isDismissible: true,
    isReadable: true,
    isDismissed: false,
    customStartTime: null,
    actualStartTime: "0001-01-01T00:00:00",
    firstCommitId: "a1d9711cd0fbb7ff7daefd10576e3fdf0c28aa54",
    lastCommitId: "a1d9711cd0fbb7ff7daefd10576e3fdf0c28aa54",
    deactivatedCommitId: null,
    sourceSpanCodeObjectInsight: "",
    firstDetected: "2025-01-28T17:36:32.344401Z",
    lastDetected: "2025-01-28T17:57:15.103137Z",
    status: InsightStatus.Active,
    flags: [],
    isRead: false,
    firstFixed: null,
    lastReopen: null,
    lastDeactivated: null,
    ignoreCriticalityOnInsert: false,
    type: InsightType.SpanPerformanceAnomaly
  };
