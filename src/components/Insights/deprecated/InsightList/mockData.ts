import {
  CodeObjectHotSpotInsight,
  InsightCategory,
  InsightScope,
  InsightType
} from "../../types";

export const mockedHotSpotInsight: CodeObjectHotSpotInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-4262-4c5d-9628-7cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Errors Hotspot",
  type: InsightType.HotSpot,
  scope: InsightScope.Function,
  category: InsightCategory.Errors,
  specifity: 3,
  importance: 2,
  score: 82,
  updatedAt: "2023-06-26T13:53:52.758Z",
  shortDisplayInfo: {
    title: "",
    targetDisplayName: "",
    subtitle: "",
    description: ""
  },
  codeObjectId:
    "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
  decorators: [
    {
      title: "Error Hotspot",
      description: "Error hotspot detected"
    }
  ],
  environment: "BOB-LAPTOP[LOCAL]",
  severity: 0,
  isRecalculateEnabled: false,
  prefixedCodeObjectId:
    "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
  customStartTime: null,
  actualStartTime: "2023-06-26T13:53:57.956Z",
  isDismissed: false,
  isDismissible: true
};
