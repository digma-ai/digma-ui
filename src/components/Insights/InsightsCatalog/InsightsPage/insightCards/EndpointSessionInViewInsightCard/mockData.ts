import {
  EndpointSessionInViewInsight,
  InsightCategory,
  InsightScope,
  InsightType
} from "../../../../types";

export const mockedEndpointSessionInViewInsight: EndpointSessionInViewInsight =
  {
    sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
    id: "60b55792-8262-4c5a-9628-7cce7979ad6d",
    firstDetected: "2023-12-05T17:25:47.010Z",
    lastDetected: "2024-01-05T13:14:47.010Z",
    criticality: 0,
    firstCommitId: "b3f7b3f",
    lastCommitId: "a1b2c3d",
    deactivatedCommitId: null,
    reopenCount: 0,
    ticketLink: null,
    impact: 0,
    name: "Session in View Query",
    type: InsightType.EndpointSessionInView,
    category: InsightCategory.Performance,
    specifity: 2,
    importance: 3,
    isDismissed: false,
    isDismissible: true,
    spans: [
      {
        renderSpan: {
          name: "Render owners/ownerDetails",
          displayName: "Render owners/ownerDetails",
          instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
          spanCodeObjectId:
            "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/ownerDetails",
          methodCodeObjectId: "",
          kind: "Internal"
        },
        clientSpan: {
          name: "6AFAE587D3FEC813CD353F4CC91076",
          displayName:
            "select p1_0.pet_id,p1_0.id,p1_0.vaccine_date from pet_vaccines p1_0 where p1_0.pet_id=? order by p1_0.vaccine_date",
          instrumentationLibrary: "io.opentelemetry.jdbc",
          spanCodeObjectId:
            "span:io.opentelemetry.jdbc$_$6AFAE587D3FEC813CD353F4CC91076",
          methodCodeObjectId: "",
          kind: "Client"
        },
        traceId: "937BDA41E6AAEAF9B140E3A7FD02D4B0"
      },
      {
        renderSpan: {
          name: "Render owners/ownerDetails 2",
          displayName: "Render owners/ownerDetails 2",
          instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
          spanCodeObjectId:
            "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/ownerDetails 2",
          methodCodeObjectId: "",
          kind: "Internal"
        },
        clientSpan: {
          name: "6AFAE587D3FEC813CD353F4CC910762",
          displayName:
            "select p1_0.pet_id,p1_0.id,p1_0.vaccine_date from pet_vaccines p1_0 where p1_0.pet_id=? order by p1_0.vaccine_date 2",
          instrumentationLibrary: "io.opentelemetry.jdbc",
          spanCodeObjectId:
            "span:io.opentelemetry.jdbc$_$6AFAE587D3FEC813CD353F4CC910762",
          methodCodeObjectId: "",
          kind: "Client"
        },
        traceId: "937BDA41E6AAEAF9B140E3A7FD02D4B02"
      },
      {
        renderSpan: {
          name: "Render owners/ownerDetails 3",
          displayName: "Render owners/ownerDetails 3",
          instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
          spanCodeObjectId:
            "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/ownerDetails 3",
          methodCodeObjectId: "",
          kind: "Internal"
        },
        clientSpan: {
          name: "6AFAE587D3FEC813CD353F4CC910763",
          displayName:
            "select p1_0.pet_id,p1_0.id,p1_0.vaccine_date from pet_vaccines p1_0 where p1_0.pet_id=? order by p1_0.vaccine_date 3",
          instrumentationLibrary: "io.opentelemetry.jdbc",
          spanCodeObjectId:
            "span:io.opentelemetry.jdbc$_$6AFAE587D3FEC813CD353F4CC910763",
          methodCodeObjectId: "",
          kind: "Client"
        },
        traceId: "937BDA41E6AAEAF9B140E3A7FD02D4B03"
      },
      {
        renderSpan: {
          name: "Render owners/ownerDetails 4",
          displayName: "Render owners/ownerDetails 4",
          instrumentationLibrary: "io.opentelemetry.spring-webmvc-6.0",
          spanCodeObjectId:
            "span:io.opentelemetry.spring-webmvc-6.0$_$Render owners/ownerDetails 4",
          methodCodeObjectId: "",
          kind: "Internal"
        },
        clientSpan: {
          name: "6AFAE587D3FEC813CD353F4CC910764",
          displayName:
            "select p1_0.pet_id,p1_0.id,p1_0.vaccine_date from pet_vaccines p1_0 where p1_0.pet_id=? order by p1_0.vaccine_date 4",
          instrumentationLibrary: "io.opentelemetry.jdbc",
          spanCodeObjectId:
            "span:io.opentelemetry.jdbc$_$6AFAE587D3FEC813CD353F4CC910764",
          methodCodeObjectId: "",
          kind: "Client"
        },
        traceId: "937BDA41E6AAEAF9B140E3A7FD02D4B04"
      }
    ],
    scope: InsightScope.EntrySpan,
    route: "epHTTP:HTTP GET /owners/{ownerId}",
    serviceName: "spring-petclinic",
    spanInfo: {
      name: "HTTP GET /owners/{ownerId}",
      displayName: "HTTP GET /owners/{ownerId}",
      instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}",
      methodCodeObjectId:
        "method:org.springframework.samples.petclinic.owner.OwnerController$_$showOwner",
      kind: "Server"
    },
    shortDisplayInfo: {
      title: "",
      targetDisplayName: "",
      subtitle: "",
      description: ""
    },
    codeObjectId:
      "org.springframework.samples.petclinic.owner.OwnerController$_$showOwner",
    decorators: [
      {
        title: "Session in View",
        description: "Session in View query detected"
      }
    ],
    environment: "BOB-LAPTOP[LOCAL]",
    severity: 0.0,
    isRecalculateEnabled: false,
    customStartTime: null,
    actualStartTime: "2023-08-10T08:59:14.093073Z"
  };
