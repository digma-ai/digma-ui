import { InsightType } from "../../../../../../../types";
import type { SpanPerformanceAnomalyInsight } from "../../../../../types";
import { InsightCategory, InsightScope } from "../../../../../types";

// TODO: check
export const mockedSpanPerformanceAnomalyInsight: SpanPerformanceAnomalyInsight =
  {
    sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
    id: "60b54792-8262-4c5d-9628-7cce7979ad6d",
    firstDetected: "2023-12-05T17:25:47.010Z",
    lastDetected: "2024-01-05T13:14:47.010Z",
    criticality: 0,
    impact: 0,
    firstCommitId: "b3f7b3f",
    lastCommitId: "a1b2c3d",
    deactivatedCommitId: null,
    reopenCount: 0,
    ticketLink: null,
    name: "Performance Anomaly",
    category: InsightCategory.Performance,
    specifity: 4,
    importance: 2,
    scope: InsightScope.Span,
    spanInfo: {
      name: "HTTP POST /owners/{ownerId}/pets/new",
      displayName: "HTTP POST /owners/{ownerId}/pets/new",
      instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/{ownerId}/pets/new",
      methodCodeObjectId:
        "method:org.springframework.samples.petclinic.owner.PetController$_$processCreationForm",
      kind: "Server"
    },
    shortDisplayInfo: {
      title: "",
      targetDisplayName: "",
      subtitle: "",
      description: ""
    },
    codeObjectId:
      "org.springframework.samples.petclinic.owner.PetController$_$processCreationForm",
    decorators: [
      {
        title: "Performance Anomaly",
        description: "Performance Anomaly detected"
      }
    ],
    environment: "BOB-LAPTOP[LOCAL]",
    severity: 0.0,
    isRecalculateEnabled: false,
    customStartTime: null,
    actualStartTime: "2023-08-10T08:04:00Z",
    type: InsightType.SpanPerformanceAnomaly,
    isDismissed: false,
    isDismissible: true,
    isRecalculatedEnabled: true,
    p50: {
      value: 3.89,
      unit: "sec",
      raw: 3887134558.2822084
    },
    p95: {
      value: 3.89,
      unit: "sec",
      raw: 3887134558.2822084
    },
    p50TraceId: "00E4D714D4FAD0A00F9D8A39C8A49E8A",
    p95TraceId: "00E4D714D4FAD0A00F9D8A39C8A49E8A",
    slowerByPercentage: 0.5
  };
