import {
  InsightCategory,
  InsightScope,
  InsightType,
  SpanQueryOptimizationInsight
} from "../../../../types";

export const mockedSpanQueryOptimizationInsight: SpanQueryOptimizationInsight =
  {
    sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
    id: "60b55792-8262-4c8d-9628-7cce7979ad6d",
    firstDetected: "2023-12-05T17:25:47.010Z",
    lastDetected: "2024-01-05T13:14:47.010Z",
    criticality: 0,
    firstCommitId: "b3f7b3f",
    lastCommitId: "a1b2c3d",
    deactivatedCommitId: null,
    reopenCount: 0,
    ticketLink: null,
    impact: 0,
    name: "QueryOptimization",
    type: InsightType.SpanQueryOptimization,
    category: InsightCategory.Performance,
    specifity: 2,
    importance: 2,
    isDismissed: false,
    isDismissible: true,
    span: {
      name: "OwnerValidation.ValidateOwner",
      displayName: "OwnerValidation.ValidateOwner",
      instrumentationLibrary:
        "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
      spanCodeObjectId:
        "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.ValidateOwner",
      methodCodeObjectId:
        "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
      kind: "Internal",
      codeObjectId:
        "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner"
    },
    traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
    duration: {
      value: 12.34,
      unit: "ms",
      raw: 1636050588.0
    },
    typicalDuration: {
      value: 4.56,
      unit: "ms",
      raw: 0
    },
    dbStatement: "select",
    serviceName: "Petclinic",
    dbName: "postgresql",
    scope: InsightScope.Span,
    spanInfo: {
      name: "OwnerValidation.ValidateOwner",
      displayName: "OwnerValidation.ValidateOwner",
      instrumentationLibrary:
        "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
      spanCodeObjectId:
        "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$OwnerValidation.ValidateOwner",
      methodCodeObjectId:
        "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
      kind: "Internal",
      codeObjectId:
        "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner"
    },
    shortDisplayInfo: {
      title: "",
      targetDisplayName: "",
      subtitle: "",
      description: ""
    },
    codeObjectId:
      "org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
    decorators: [
      {
        title: "N+1",
        description: "Supected NPlus One"
      }
    ],
    environment: "BOB-LAPTOP[LOCAL]",
    severity: 0.0,
    isRecalculateEnabled: false,
    prefixedCodeObjectId:
      "method:org.springframework.samples.petclinic.domain.OwnerValidation$_$ValidateOwner",
    customStartTime: null,
    actualStartTime: "2023-07-27T08:23:56.500827Z",
    endpoints: [
      {
        endpointInfo: {
          route: "HTTP POST /owners/new",
          instrumentationLibrary: "OwnerController",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new",
          serviceName: "spring-petclinic"
        }
      }
    ]
  };
