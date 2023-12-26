import { InsightType } from "../../../types";
import {
  EndpointHighNumberOfQueriesInsight,
  InsightCategory,
  InsightScope
} from "../types";

export const mockedHighNumberOfQueriesInsight: EndpointHighNumberOfQueriesInsight =
  {
    criticality: 0,
    impact: 0,
    name: "High number of queries",
    type: InsightType.EndpointHighNumberOfQueries,
    category: InsightCategory.Performance,
    specifity: 2,
    importance: 3,
    queriesCount: 250,
    typicalCount: 4,
    medianDuration: {
      value: 150,
      unit: "ms",
      raw: 150000000.0
    },
    requestFraction: 0.3,
    traceId: "00D37A4E7208E0F6E89AA7E2E37446A6",
    scope: InsightScope.EntrySpan,
    endpointSpan: "HTTP POST /owners/{ownerId}/pets/new",
    spanCodeObjectId:
      "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/{ownerId}/pets/new",
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
      kind: "Server",
      codeObjectId:
        "org.springframework.samples.petclinic.owner.PetController$_$processCreationForm"
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
    prefixedCodeObjectId:
      "method:org.springframework.samples.petclinic.owner.PetController$_$processCreationForm",
    customStartTime: null,
    actualStartTime: "2023-08-10T08:04:00Z"
  };
