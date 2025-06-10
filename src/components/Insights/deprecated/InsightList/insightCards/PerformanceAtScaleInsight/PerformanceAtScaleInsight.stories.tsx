import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PerformanceAtScaleInsight } from ".";
import { InsightType } from "../../../../../../types";
import { InsightCategory, InsightScope } from "../../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PerformanceAtScaleInsight> = {
  title:
    "Insights/deprecated/InsightList/insightCards/PerformanceAtScaleInsight",
  component: PerformanceAtScaleInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof PerformanceAtScaleInsight>;

export const Default: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55492-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Scaling Insufficient Data",
      type: InsightType.SpanScalingInsufficientData,
      category: InsightCategory.Performance,
      specifity: 4,
      importance: 5,
      isDismissed: false,
      isDismissible: true,
      concurrencies: [
        {
          calls: 1,
          meanDuration: {
            value: 2.01,
            unit: "sec",
            raw: 2006871000
          }
        },
        {
          calls: 30,
          meanDuration: {
            value: 3.48,
            unit: "ms",
            raw: 3479266.6666666665
          }
        }
      ],
      scope: InsightScope.Span,
      spanInfo: {
        name: "HTTP POST Transfer/TransferFunds",
        displayName: "HTTP POST Transfer/TransferFunds",
        instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
        spanCodeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",
        methodCodeObjectId:
          "method:Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
        kind: "Server"
      },
      shortDisplayInfo: {
        title: "Scaling Data",
        targetDisplayName: "",
        subtitle: "",
        description: "Partial scale data is available"
      },
      codeObjectId:
        "Sample.MoneyTransfer.API.Controllers.TransferController$_$TransferFunds(TransferRequest)",
      decorators: null,
      environment: "BOB-LAPTOP[LOCAL]",
      severity: 0,
      isRecalculateEnabled: false,
      customStartTime: null,
      actualStartTime: "2023-06-24T00:00:00.000Z"
    }
  }
};
