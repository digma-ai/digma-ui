import {
  CodeObjectErrorsInsight,
  InsightCategory,
  InsightScope,
  InsightType
} from "../../../../types";

export const mockedErrorsInsight: CodeObjectErrorsInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-3262-4c5d-9628-7cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Errors",
  type: InsightType.Errors,
  scope: InsightScope.Function,
  category: InsightCategory.Errors,
  specifity: 4,
  importance: 5,
  errorCount: 2,
  unhandledCount: 0,
  unexpectedCount: 0,
  topErrors: [
    {
      uid: "305f52ec-1428-11ee-a28c-0242ac170004",
      codeObjectId:
        "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
      errorType: "System.NullReferenceException",
      sourceCodeObjectId:
        "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$ValidateAccountFunds(Account,Int32)"
    },
    {
      uid: "29dbdf80-1428-11ee-b389-0242ac170004",
      codeObjectId:
        "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
      errorType: "System.Exception",
      sourceCodeObjectId:
        "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)"
    }
  ],
  shortDisplayInfo: {
    title: "",
    targetDisplayName: "",
    subtitle: "",
    description: ""
  },
  codeObjectId:
    "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
  decorators: null,
  environment: "BOB-LAPTOP[LOCAL]",
  severity: 0,
  isRecalculateEnabled: false,
  prefixedCodeObjectId:
    "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
  customStartTime: null,
  actualStartTime: "2023-06-26T13:53:53.645Z",
  isDismissed: false,
  isDismissible: true
};
