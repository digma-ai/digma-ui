import { Meta, StoryObj } from "@storybook/react";
import { ErrorsInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorsInsight> = {
  title: "Insights/ErrorsInsight",
  component: ErrorsInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: {
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
          uid: "c4436bfe-1736-11ee-9651-0242ac1a0004",
          codeObjectId:
            "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)",
          errorType: "System.NullReferenceException",
          sourceCodeObjectId:
            "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$ValidateAccountFunds(Account,Int32)"
        },
        {
          uid: "c443658c-1736-11ee-9cb1-0242ac1a0004",
          codeObjectId:
            "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)",
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
        "Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)",
      decorators: null,
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: false,
      prefixedCodeObjectId:
        "method:Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)",
      customStartTime: null,
      actualStartTime: "2023-07-03T04:26:43.430Z"
    }
  }
};