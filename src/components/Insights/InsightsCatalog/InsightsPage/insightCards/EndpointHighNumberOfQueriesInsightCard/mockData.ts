import { InsightType } from "../../../../../../types";
import {
  EndpointHighNumberOfQueriesInsight,
  InsightCategory,
  InsightScope
} from "../../../../types";

export const mockedEndpointHighNumberOfQueriesInsight: EndpointHighNumberOfQueriesInsight =
  {
    sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
    id: "60b55792-8262-4c5d-9623-7cce7979ad6d",
    firstDetected: "2023-12-05T17:25:47.010Z",
    lastDetected: "2024-01-05T13:14:47.010Z",
    criticality: 0.5,
    impact: 0,
    firstCommitId: "b3f7b3f",
    lastCommitId: "a1b2c3d",
    deactivatedCommitId: null,
    reopenCount: 0,
    ticketLink: null,
    name: "High number of queries",
    type: InsightType.EndpointHighNumberOfQueries,
    category: InsightCategory.Performance,
    specifity: 2,
    importance: 3,
    queriesCount: 250,
    typicalCount: 4,
    traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
    scope: InsightScope.EntrySpan,
    route: "epHTTP:HTTP POST /owners/{ownerId}/pets/new",
    serviceName: "spring-petclinic",
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
        title: "Excessive HTTP Calls",
        description: "Numerous Http calls to the same endpoint detected "
      }
    ],
    environment: "BOB-LAPTOP[LOCAL]",
    severity: 0.0,
    isRecalculateEnabled: false,
    customStartTime: null,
    actualStartTime: "2023-08-10T08:04:00Z",
    quantile: 0.5,
    isDismissed: false,
    isDismissible: true
  };
