import { InsightType } from "../../../../../../../types";
import type { EndpointQueryOptimizationV2Insight } from "../../../../../types";
import { InsightCategory, InsightScope } from "../../../../../types";

export const mockedEndpointQueryOptimizationV2Insight: EndpointQueryOptimizationV2Insight =
  {
    sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
    id: "60b55792-8262-4c5d-9628-7cce7989ad6d",
    firstDetected: "2023-12-05T17:25:47.010Z",
    lastDetected: "2024-01-05T13:14:47.010Z",
    criticality: 0,
    firstCommitId: "b3f7b3f",
    lastCommitId: "a1b2c3d",
    deactivatedCommitId: null,
    reopenCount: 0,
    ticketLink: null,
    impact: 0,
    name: "Query Optimization",
    type: InsightType.EndpointQueryOptimizationV2,
    category: InsightCategory.Performance,
    specifity: 2,
    importance: 3,
    isDismissed: false,
    isDismissible: true,
    span: {
      spanInfo: {
        name: "1D138649EB4FFA92C0E3C8103404F2",
        displayName: "select * from users where id = :id",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId:
          "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F2",
        methodCodeObjectId: null,
        kind: "Client"
      },
      traceId: "9C510BC1E1CD59DD7E820BC3E8DFD4C4",
      duration: {
        value: 70.08,
        unit: "μs",
        raw: 70081
      },
      criticality: 0.3,
      impact: 0,
      severity: 0,
      ticketLink: "https://digma.ai/1"
    },
    scope: InsightScope.EntrySpan,
    route: "epHTTP:HTTP GET /SampleInsights/QueryOptimization",
    serviceName: "PetClinic",
    spanInfo: {
      name: "HTTP GET /SampleInsights/QueryOptimization",
      displayName: "HTTP GET /SampleInsights/QueryOptimization",
      instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/QueryOptimization",
      methodCodeObjectId:
        "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genQueryOptimization",
      kind: "Server"
    },
    shortDisplayInfo: {
      title: "",
      targetDisplayName: "",
      subtitle: "",
      description: ""
    },
    codeObjectId:
      "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genQueryOptimization",
    decorators: [
      {
        title: "Query Optimization Suggested",
        description: "Query Optimization Suggested"
      }
    ],
    environment: "SAMPLE_ENV",
    severity: 0,
    isRecalculateEnabled: true,
    customStartTime: null,
    actualStartTime: "2023-06-16T10:30:33.027Z"
  };
