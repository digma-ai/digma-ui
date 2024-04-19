import { Test } from "../types";

export const mockedTest: Test = {
  name: "GET /owners/{ownerId}/pets/{petId}/visits/new",
  spanInfo: {
    name: "GET /owners/{ownerId}/pets/{petId}/visits/new",
    displayName: "GET /owners/{ownerId}/pets/{petId}/visits/new",
    instrumentationLibrary: "com.digma.junit",
    spanCodeObjectId:
      "span:com.digma.junit$_$GET /owners/{ownerId}/pets/{petId}/visits/new",
    methodCodeObjectId:
      "org.springframework.samples.petclinic.owner.VisitController$_$initNewVisitForm",
    kind: "Internal"
  },
  result: "success",
  runAt: "2024-01-04T16:06:46.568728Z",
  duration: {
    value: 1.11,
    unit: "μs",
    raw: 1111
  },
  environment: "BOB-MACBOOK-PRO-2.LOCAL[LOCAL-TESTS]",
  environmentId: "BOB-MACBOOK-PRO-2.LOCAL[LOCAL-TESTS]#ID#1",
  traceId: "E03E928B296A8C69511F09422DE6CDA5",
  ticketId: null,
  commitId: null,
  errorOrFailMessage: null,
  contextsSpanCodeObjectIds: ["123"]
};
