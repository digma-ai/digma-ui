import { InsightType } from "../../../types";
import {
  EndpointSuspectedNPlusOneInsight,
  InsightCategory,
  InsightScope
} from "../types";

export const mockedEndpointNPlusOneInsight: EndpointSuspectedNPlusOneInsight = {
  criticality: 0,
  firstCommitId: null,
  lastCommitId: null,
  deactivatedCommitId: null,
  reopenCount: 0,
  impact: 0,
  name: "Suspected N+1 Query",
  type: InsightType.EndpointSpanNPlusOne,
  category: InsightCategory.Performance,
  specifity: 2,
  importance: 3,
  spans: [
    {
      occurrences: 200,
      internalSpan: null,
      clientSpan: {
        name: "1D138649EB4FFA92C0E3C8103404F2",
        displayName: "select * from users where id = :id",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId:
          "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F2",
        methodCodeObjectId: null,
        kind: "Client",
        codeObjectId: null
      },
      traceId: "9C510BC1E1CD59DD7E820BC3E8DFD4C4",
      duration: {
        value: 70.08,
        unit: "μs",
        raw: 70081
      },
      fraction: 0.08985711281727758,
      criticality: 0.3,
      impact: 0,
      severity: 0
    }
  ],
  scope: InsightScope.EntrySpan,
  endpointSpan: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
  spanCodeObjectId:
    "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
  route: "epHTTP:HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
  serviceName: "PetClinic",
  spanInfo: {
    name: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
    displayName: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
    instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
    spanCodeObjectId:
      "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
    methodCodeObjectId:
      "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
    kind: "Server",
    codeObjectId:
      "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan"
  },
  shortDisplayInfo: {
    title: "",
    targetDisplayName: "",
    subtitle: "",
    description: ""
  },
  codeObjectId:
    "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
  decorators: [
    {
      title: "N+1 Suspected",
      description: "Supected NPlus One"
    }
  ],
  environment: "SAMPLE_ENV",
  severity: 0,
  isRecalculateEnabled: true,
  prefixedCodeObjectId:
    "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
  customStartTime: null,
  actualStartTime: "2023-06-16T10:30:33.027Z"
};
