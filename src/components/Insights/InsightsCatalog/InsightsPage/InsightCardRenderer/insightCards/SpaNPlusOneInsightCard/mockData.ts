import type { SpaNPlusOneInsight } from "../../../../../types";
import {
  InsightCategory,
  InsightScope,
  InsightType
} from "../../../../../types";

export const mockedSpaNPlusOneInsight: SpaNPlusOneInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-4c5d-9628-8cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "N+1",
  type: InsightType.SpaNPlusOne,
  category: InsightCategory.Performance,
  specifity: 2,
  importance: 2,
  isDismissed: false,
  isDismissible: true,
  traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
  duration: {
    value: 1.64,
    unit: "sec",
    raw: 1636050588.0
  },
  endpoints: [
    {
      endpointInfo: {
        route: "HTTP POST /owners/new",
        instrumentationLibrary: "OwnerController",
        spanCodeObjectId:
          "span:OwnerController$_$1D138649EB4FFA92C0E3C8103404F2",
        entrySpanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new",
        serviceName: "spring-petclinic"
      },
      occurrences: 100,
      criticality: 0.8,
      impact: 0,
      severity: 0,
      requestPercentage: 50,
      traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
      commitId: "a1b2c3d",
      duration: {
        value: 1.64,
        unit: "sec",
        raw: 1636050588.0
      }
    },
    {
      endpointInfo: {
        route: "HTTP GET /owners",
        instrumentationLibrary: "OwnerController",
        spanCodeObjectId:
          "span:OwnerController$_$1D138649EB4FFA92C0E3C8103404F3",
        entrySpanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners",
        serviceName: "spring-petclinic"
      },
      occurrences: 10,
      criticality: 0.8,
      impact: 0,
      severity: 0,
      requestPercentage: 80,
      traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
      commitId: "a1b2c3d",
      duration: {
        value: 3.64,
        unit: "sec",
        raw: 3636050588.0
      }
    }
  ],
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
    kind: "Internal"
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
  customStartTime: null,
  actualStartTime: "2023-07-27T08:23:56.500827Z"
};
