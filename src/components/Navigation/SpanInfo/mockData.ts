import { SpanInfoData } from "./types";

export const mockedSpanInfoData: SpanInfoData = {
  displayName:
    "select v1_0.pet_id,v1_0. id, v1_0. visit_date, v1_0. description from visits v1_0 where v1_0.petid=? order by v1_0.visit_date",
  assetTypeId: "DatabaseQueries",
  services: [
    "Digma analytics",
    "Digma service1",
    "Digma service2",
    "Digma service3",
    "Digma service4"
  ],
  environments: [
    {
      id: "1",
      type: "Public",
      name: "Dev"
    },
    {
      id: "2",
      type: "Public",
      name: "Stage"
    },
    {
      id: "3",
      type: "Public",
      name: "DEV1"
    },
    {
      id: "4",
      type: "Public",
      name: "Local"
    },
    {
      id: "5",
      type: "Public",
      name: "EDGE"
    },
    {
      id: "6",
      type: "Public",
      name: "Production"
    }
  ],
  firstSeen: "2024-08-07T11:59:41.727487Z",
  lastSeen: "2024-10-04T09:21:14.115914Z"
};
