import { Meta, StoryObj } from "@storybook/react";
import { DurationInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DurationInsight> = {
  title: "Insights/DurationInsight",
  component: DurationInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithChange: Story = {
  args: {
    insight: {
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
      span: {
        name: "DelayAsync",
        displayName: "DelayAsync",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
        methodCodeObjectId: null,
        kind: "Internal",
        codeObjectId: null
      },
      percentiles: [
        {
          percentile: 0.5,
          currentDuration: {
            value: 110.74,
            unit: "ms",
            raw: 110735000
          },
          previousDuration: {
            value: 12.55,
            unit: "ms",
            raw: 12548500
          },
          changeTime: "2023-06-30T11:08:55.000Z",
          changeVerified: true,
          traceIds: ["6FB14B53449D3D360DC42A5F44F9D35B"]
        },
        {
          percentile: 0.95,
          currentDuration: {
            value: 2.01,
            unit: "sec",
            raw: 2005005050
          },
          previousDuration: {
            value: 2.01,
            unit: "sec",
            raw: 2005133700
          },
          changeTime: "2023-06-30T11:10:00.000Z",
          changeVerified: true,
          traceIds: ["E6FE5ACDDB1C6E6D5284B1D9579964B0"]
        }
      ],
      lastSpanInstanceInfo: {
        traceId: "3E41E4197B696CA9BF1157AEB254DFE0",
        spanId: "9C31D7C85CF413B4",
        startTime: "2023-06-30T11:10:13.542Z",
        duration: {
          value: 91.95,
          unit: "ms",
          raw: 91951000
        }
      },
      scope: InsightScope.Span,
      spanInfo: {
        name: "DelayAsync",
        displayName: "DelayAsync",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
        methodCodeObjectId: null,
        kind: "Internal",
        codeObjectId: null
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId: "SampleInsightsController$_$DelayAsync",
      decorators: [
        {
          title: "Slowing",
          description: "Duration for this section is increasing"
        }
      ],
      environment: "BOB-LAPTOP[LOCAL]",
      importance: 2,
      severity: 0,
      prefixedCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
      customStartTime: null,
      actualStartTime: "2023-06-17T00:00:00.000Z"
    }
  }
};

export const WithEvaluatingChange: Story = {
  args: {
    insight: {
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
      span: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: "Internal",
        codeObjectId: null
      },
      percentiles: [
        {
          percentile: 0.5,
          currentDuration: {
            value: 5.17,
            unit: "sec",
            raw: 5172711500
          },
          previousDuration: {
            value: 445.68,
            unit: "ms",
            raw: 445678000
          },
          changeTime: "2023-06-30T11:09:55.000Z",
          changeVerified: false,
          traceIds: ["84040A4EBABE187EDB487085ABC279A8"]
        },
        {
          percentile: 0.95,
          currentDuration: {
            value: 8.15,
            unit: "sec",
            raw: 8146584400
          },
          previousDuration: {
            value: 1.72,
            unit: "sec",
            raw: 1718651499.9999993
          },
          changeTime: "2023-06-30T11:09:54.000Z",
          changeVerified: false,
          traceIds: ["CA11A5F32F260E52FDAE74B006CE6D61"]
        }
      ],
      lastSpanInstanceInfo: {
        traceId: "3E41E4197B696CA9BF1157AEB254DFE0",
        spanId: "7F672B399993472C",
        startTime: "2023-06-30T11:10:04.991Z",
        duration: {
          value: 8.64,
          unit: "sec",
          raw: 8643204000
        }
      },
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: "Internal",
        codeObjectId: null
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock",
      decorators: [
        {
          title: "Slowing",
          description: "Duration for this section is increasing"
        }
      ],
      environment: "BOB-LAPTOP[LOCAL]",
      importance: 2,
      severity: 0,
      prefixedCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
      customStartTime: null,
      actualStartTime: "2023-06-17T00:00:00.000Z"
    }
  }
};
