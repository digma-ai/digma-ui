import { InsightType } from "../../../types";
import { InsightCategory, InsightScope, SpanNexusInsight } from "../types";

export const mockedSpanNexusInsight: SpanNexusInsight = {
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
  name: "Code Nexus Point",
  type: InsightType.SpanNexus,
  category: InsightCategory.Usage,
  specifity: 2,
  importance: 3,
  scope: InsightScope.Span,
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
  actualStartTime: "2023-08-10T08:04:00Z",
  flows: 4,
  services: 3,
  entries: 5,
  isEntriesHigh: false,
  isFlowsHigh: true,
  isServicesHigh: false
};
