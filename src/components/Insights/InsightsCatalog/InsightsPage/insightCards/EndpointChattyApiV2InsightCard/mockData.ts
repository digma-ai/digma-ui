import {
  EndpointChattyApiV2Insight,
  InsightCategory,
  InsightScope,
  InsightType
} from "../../../../types";

export const mockedEndpointChattyApiV2Insight: EndpointChattyApiV2Insight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-4c5d-9688-7cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0.5,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "HTTP Chatter",
  type: InsightType.EndpointChattyApiV2,
  category: InsightCategory.Performance,
  specifity: 2,
  importance: 3,
  isDismissed: false,
  isDismissible: true,
  span: {
    repeats: 29,
    clientSpan: {
      name: "HTTP GET mockapi.io",
      displayName: "HTTP GET mockapi.io",
      instrumentationLibrary: "io.opentelemetry.okhttp-3.0",
      spanCodeObjectId:
        "span:io.opentelemetry.okhttp-3.0$_$HTTP GET mockapi.io",
      methodCodeObjectId: null,
      kind: "Client"
    },
    traceId: "00E4D714D4FAD0A00F9D8A39C8A49E8A"
  },

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
  actualStartTime: "2023-08-10T08:04:00Z"
};
