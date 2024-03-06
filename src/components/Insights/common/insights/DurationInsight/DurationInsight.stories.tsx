import { Meta, StoryObj } from "@storybook/react";
import { DurationInsight } from ".";
import { InsightCategory, InsightScope, InsightType } from "../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DurationInsight> = {
  title: "Insights/common/insights/DurationInsight",
  component: DurationInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithAverage: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: "2023-12-05T17:25:47.010Z",
      lastDetected: "2024-01-05T13:14:47.010Z",
      criticality: 0,
      firstCommitId: "b3f7b3f",
      lastCommitId: "a1b2c3d",
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
      isDismissed: false,
      isDismissible: true,
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false,
      average: {
        value: 110.74,
        unit: "ms",
        raw: 110735000
      },
      standardDeviation: {
        value: 12.55,
        unit: "ms",
        raw: 12548500
      }
    }
  }
};

export const WithChange: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: null,
      lastDetected: null,
      criticality: 0,
      firstCommitId: null,
      lastCommitId: null,
      deactivatedCommitId: null,
      isDismissed: false,
      isDismissible: true,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false
    }
  }
};

export const WithEvaluatingChange: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: null,
      lastDetected: null,
      criticality: 0,
      firstCommitId: null,
      lastCommitId: null,
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
      isDismissed: false,
      isDismissible: true,
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false
    }
  }
};

export const HistogramWithManyBars: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: null,
      lastDetected: null,
      criticality: 0,
      firstCommitId: null,
      lastCommitId: null,
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      isDismissed: false,
      isDismissible: true,
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false,
      histogramPlot: {
        bars: [
          {
            index: 0,
            count: 30,
            start: {
              value: 2.66,
              unit: "ms",
              raw: 2656500
            },
            end: {
              value: 2.92,
              unit: "ms",
              raw: 2922100
            }
          },
          {
            index: 1,
            count: 3,
            start: {
              value: 2.92,
              unit: "ms",
              raw: 2922100
            },
            end: {
              value: 3.19,
              unit: "ms",
              raw: 3187800
            }
          },
          {
            index: 4,
            count: 10,
            start: {
              value: 3.72,
              unit: "ms",
              raw: 3719100
            },
            end: {
              value: 3.98,
              unit: "ms",
              raw: 3984700.0000000005
            }
          },
          {
            index: 5,
            count: 9,
            start: {
              value: 3.98,
              unit: "ms",
              raw: 3984700.0000000005
            },
            end: {
              value: 4.25,
              unit: "ms",
              raw: 4250400
            }
          },
          {
            index: 7,
            count: 3,
            start: {
              value: 4.52,
              unit: "ms",
              raw: 4516000
            },
            end: {
              value: 4.78,
              unit: "ms",
              raw: 4781700
            }
          },
          {
            index: 8,
            count: 2,
            start: {
              value: 4.78,
              unit: "ms",
              raw: 4781700
            },
            end: {
              value: 5.05,
              unit: "ms",
              raw: 5047300
            }
          },
          {
            index: 13,
            count: 2,
            start: {
              value: 6.11,
              unit: "ms",
              raw: 6109900
            },
            end: {
              value: 6.38,
              unit: "ms",
              raw: 6375600
            }
          },
          {
            index: 14,
            count: 2,
            start: {
              value: 6.38,
              unit: "ms",
              raw: 6375600
            },
            end: {
              value: 6.64,
              unit: "ms",
              raw: 6641200.000000001
            }
          },
          {
            index: 15,
            count: 1,
            start: {
              value: 6.64,
              unit: "ms",
              raw: 6641200.000000001
            },
            end: {
              value: 6.91,
              unit: "ms",
              raw: 6906900.000000001
            }
          },
          {
            index: 18,
            count: 6,
            start: {
              value: 7.44,
              unit: "ms",
              raw: 7438200
            },
            end: {
              value: 7.7,
              unit: "ms",
              raw: 7703800
            }
          },
          {
            index: 19,
            count: 6,
            start: {
              value: 7.7,
              unit: "ms",
              raw: 7703800
            },
            end: {
              value: 7.97,
              unit: "ms",
              raw: 7969500
            }
          },
          {
            index: 20,
            count: 6,
            start: {
              value: 7.97,
              unit: "ms",
              raw: 7969500
            },
            end: {
              value: 8.24,
              unit: "ms",
              raw: 8235099.999999998
            }
          },
          {
            index: 21,
            count: 2,
            start: {
              value: 8.24,
              unit: "ms",
              raw: 8235099.999999998
            },
            end: {
              value: 8.5,
              unit: "ms",
              raw: 8500800
            }
          },
          {
            index: 22,
            count: 2,
            start: {
              value: 8.5,
              unit: "ms",
              raw: 8500800
            },
            end: {
              value: 8.77,
              unit: "ms",
              raw: 8766400.000000002
            }
          },
          {
            index: 23,
            count: 1,
            start: {
              value: 8.77,
              unit: "ms",
              raw: 8766400.000000002
            },
            end: {
              value: 9.03,
              unit: "ms",
              raw: 9032100
            }
          },
          {
            index: 27,
            count: 2,
            start: {
              value: 9.83,
              unit: "ms",
              raw: 9829000
            },
            end: {
              value: 10.09,
              unit: "ms",
              raw: 10094699.999999998
            }
          },
          {
            index: 28,
            count: 1,
            start: {
              value: 10.09,
              unit: "ms",
              raw: 10094699.999999998
            },
            end: {
              value: 10.36,
              unit: "ms",
              raw: 10360300.000000002
            }
          },
          {
            index: 29,
            count: 1,
            start: {
              value: 10.36,
              unit: "ms",
              raw: 10360300.000000002
            },
            end: {
              value: 10.63,
              unit: "ms",
              raw: 10626000
            }
          },
          {
            index: 30,
            count: 1,
            start: {
              value: 10.63,
              unit: "ms",
              raw: 10626000
            },
            end: {
              value: 10.89,
              unit: "ms",
              raw: 10891600
            }
          },
          {
            index: 31,
            count: 5,
            start: {
              value: 10.89,
              unit: "ms",
              raw: 10891600
            },
            end: {
              value: 11.16,
              unit: "ms",
              raw: 11157300
            }
          },
          {
            index: 32,
            count: 5,
            start: {
              value: 11.16,
              unit: "ms",
              raw: 11157300
            },
            end: {
              value: 11.42,
              unit: "ms",
              raw: 11422900
            }
          },
          {
            index: 33,
            count: 4,
            start: {
              value: 11.42,
              unit: "ms",
              raw: 11422900
            },
            end: {
              value: 11.69,
              unit: "ms",
              raw: 11688599.999999998
            }
          },
          {
            index: 34,
            count: 4,
            start: {
              value: 11.69,
              unit: "ms",
              raw: 11688599.999999998
            },
            end: {
              value: 11.95,
              unit: "ms",
              raw: 11954300
            }
          },
          {
            index: 35,
            count: 1,
            start: {
              value: 11.95,
              unit: "ms",
              raw: 11954300
            },
            end: {
              value: 12.22,
              unit: "ms",
              raw: 12219900.000000002
            }
          },
          {
            index: 36,
            count: 1,
            start: {
              value: 12.22,
              unit: "ms",
              raw: 12219900.000000002
            },
            end: {
              value: 12.49,
              unit: "ms",
              raw: 12485600
            }
          },
          {
            index: 37,
            count: 1,
            start: {
              value: 12.49,
              unit: "ms",
              raw: 12485600
            },
            end: {
              value: 12.75,
              unit: "ms",
              raw: 12751200
            }
          },
          {
            index: 38,
            count: 1,
            start: {
              value: 12.75,
              unit: "ms",
              raw: 12751200
            },
            end: {
              value: 13.02,
              unit: "ms",
              raw: 13016900
            }
          },
          {
            index: 39,
            count: 1,
            start: {
              value: 13.02,
              unit: "ms",
              raw: 13016900
            },
            end: {
              value: 13.28,
              unit: "ms",
              raw: 13282500
            }
          },
          {
            index: 45,
            count: 5,
            start: {
              value: 14.61,
              unit: "ms",
              raw: 14610800
            },
            end: {
              value: 14.88,
              unit: "ms",
              raw: 14876400
            }
          },
          {
            index: 46,
            count: 4,
            start: {
              value: 14.88,
              unit: "ms",
              raw: 14876400
            },
            end: {
              value: 15.14,
              unit: "ms",
              raw: 15142099.999999998
            }
          },
          {
            index: 47,
            count: 4,
            start: {
              value: 15.14,
              unit: "ms",
              raw: 15142099.999999998
            },
            end: {
              value: 15.41,
              unit: "ms",
              raw: 15407700
            }
          },
          {
            index: 48,
            count: 4,
            start: {
              value: 15.41,
              unit: "ms",
              raw: 15407700
            },
            end: {
              value: 15.67,
              unit: "ms",
              raw: 15673400.000000002
            }
          },
          {
            index: 49,
            count: 4,
            start: {
              value: 15.67,
              unit: "ms",
              raw: 15673400.000000002
            },
            end: {
              value: 15.94,
              unit: "ms",
              raw: 15939000
            }
          },
          {
            index: 50,
            count: 4,
            start: {
              value: 15.94,
              unit: "ms",
              raw: 15939000
            },
            end: {
              value: 16.2,
              unit: "ms",
              raw: 16204699.999999998
            }
          },
          {
            index: 51,
            count: 1,
            start: {
              value: 16.2,
              unit: "ms",
              raw: 16204699.999999998
            },
            end: {
              value: 16.47,
              unit: "ms",
              raw: 16470300.000000004
            }
          },
          {
            index: 52,
            count: 1,
            start: {
              value: 16.47,
              unit: "ms",
              raw: 16470300.000000004
            },
            end: {
              value: 16.74,
              unit: "ms",
              raw: 16736000
            }
          },
          {
            index: 53,
            count: 1,
            start: {
              value: 16.74,
              unit: "ms",
              raw: 16736000
            },
            end: {
              value: 17,
              unit: "ms",
              raw: 17001600
            }
          },
          {
            index: 54,
            count: 1,
            start: {
              value: 17,
              unit: "ms",
              raw: 17001600
            },
            end: {
              value: 17.27,
              unit: "ms",
              raw: 17267300
            }
          },
          {
            index: 55,
            count: 1,
            start: {
              value: 17.27,
              unit: "ms",
              raw: 17267300
            },
            end: {
              value: 17.53,
              unit: "ms",
              raw: 17532900
            }
          },
          {
            index: 57,
            count: 1,
            start: {
              value: 17.8,
              unit: "ms",
              raw: 17798600.000000004
            },
            end: {
              value: 18.06,
              unit: "ms",
              raw: 18064200
            }
          },
          {
            index: 58,
            count: 1,
            start: {
              value: 18.06,
              unit: "ms",
              raw: 18064200
            },
            end: {
              value: 18.33,
              unit: "ms",
              raw: 18329899.999999996
            }
          },
          {
            index: 59,
            count: 1,
            start: {
              value: 18.33,
              unit: "ms",
              raw: 18329899.999999996
            },
            end: {
              value: 18.6,
              unit: "ms",
              raw: 18595500
            }
          },
          {
            index: 60,
            count: 1,
            start: {
              value: 18.6,
              unit: "ms",
              raw: 18595500
            },
            end: {
              value: 18.86,
              unit: "ms",
              raw: 18861200
            }
          },
          {
            index: 61,
            count: 1,
            start: {
              value: 18.86,
              unit: "ms",
              raw: 18861200
            },
            end: {
              value: 19.13,
              unit: "ms",
              raw: 19126800
            }
          },
          {
            index: 64,
            count: 4,
            start: {
              value: 19.66,
              unit: "ms",
              raw: 19658100.000000004
            },
            end: {
              value: 19.92,
              unit: "ms",
              raw: 19923800
            }
          },
          {
            index: 65,
            count: 3,
            start: {
              value: 19.92,
              unit: "ms",
              raw: 19923800
            },
            end: {
              value: 20.19,
              unit: "ms",
              raw: 20189399.999999996
            }
          },
          {
            index: 66,
            count: 3,
            start: {
              value: 20.19,
              unit: "ms",
              raw: 20189399.999999996
            },
            end: {
              value: 20.46,
              unit: "ms",
              raw: 20455100.000000004
            }
          },
          {
            index: 67,
            count: 3,
            start: {
              value: 20.46,
              unit: "ms",
              raw: 20455100.000000004
            },
            end: {
              value: 20.72,
              unit: "ms",
              raw: 20720700
            }
          },
          {
            index: 68,
            count: 3,
            start: {
              value: 20.72,
              unit: "ms",
              raw: 20720700
            },
            end: {
              value: 20.99,
              unit: "ms",
              raw: 20986400
            }
          },
          {
            index: 69,
            count: 3,
            start: {
              value: 20.99,
              unit: "ms",
              raw: 20986400
            },
            end: {
              value: 21.25,
              unit: "ms",
              raw: 21252000
            }
          },
          {
            index: 70,
            count: 3,
            start: {
              value: 21.25,
              unit: "ms",
              raw: 21252000
            },
            end: {
              value: 21.52,
              unit: "ms",
              raw: 21517700
            }
          },
          {
            index: 71,
            count: 1,
            start: {
              value: 21.52,
              unit: "ms",
              raw: 21517700
            },
            end: {
              value: 21.78,
              unit: "ms",
              raw: 21783300
            }
          },
          {
            index: 72,
            count: 1,
            start: {
              value: 21.78,
              unit: "ms",
              raw: 21783300
            },
            end: {
              value: 22.05,
              unit: "ms",
              raw: 22049000
            }
          },
          {
            index: 73,
            count: 1,
            start: {
              value: 22.05,
              unit: "ms",
              raw: 22049000
            },
            end: {
              value: 22.31,
              unit: "ms",
              raw: 22314600
            }
          },
          {
            index: 79,
            count: 3,
            start: {
              value: 23.64,
              unit: "ms",
              raw: 23642900
            },
            end: {
              value: 23.91,
              unit: "ms",
              raw: 23908600
            }
          },
          {
            index: 80,
            count: 3,
            start: {
              value: 23.91,
              unit: "ms",
              raw: 23908600
            },
            end: {
              value: 24.17,
              unit: "ms",
              raw: 24174200
            }
          },
          {
            index: 81,
            count: 3,
            start: {
              value: 24.17,
              unit: "ms",
              raw: 24174200
            },
            end: {
              value: 24.44,
              unit: "ms",
              raw: 24439900
            }
          },
          {
            index: 82,
            count: 3,
            start: {
              value: 24.44,
              unit: "ms",
              raw: 24439900
            },
            end: {
              value: 24.71,
              unit: "ms",
              raw: 24705500
            }
          },
          {
            index: 83,
            count: 2,
            start: {
              value: 24.71,
              unit: "ms",
              raw: 24705500
            },
            end: {
              value: 24.97,
              unit: "ms",
              raw: 24971200
            }
          },
          {
            index: 84,
            count: 2,
            start: {
              value: 24.97,
              unit: "ms",
              raw: 24971200
            },
            end: {
              value: 25.24,
              unit: "ms",
              raw: 25236800
            }
          },
          {
            index: 85,
            count: 2,
            start: {
              value: 25.24,
              unit: "ms",
              raw: 25236800
            },
            end: {
              value: 25.5,
              unit: "ms",
              raw: 25502500
            }
          },
          {
            index: 86,
            count: 2,
            start: {
              value: 25.5,
              unit: "ms",
              raw: 25502500
            },
            end: {
              value: 25.77,
              unit: "ms",
              raw: 25768100.000000004
            }
          },
          {
            index: 87,
            count: 2,
            start: {
              value: 25.77,
              unit: "ms",
              raw: 25768100.000000004
            },
            end: {
              value: 26.03,
              unit: "ms",
              raw: 26033800
            }
          },
          {
            index: 88,
            count: 3,
            start: {
              value: 26.03,
              unit: "ms",
              raw: 26033800
            },
            end: {
              value: 26.3,
              unit: "ms",
              raw: 26299399.999999996
            }
          },
          {
            index: 89,
            count: 3,
            start: {
              value: 26.3,
              unit: "ms",
              raw: 26299399.999999996
            },
            end: {
              value: 26.57,
              unit: "ms",
              raw: 26565100.000000004
            }
          },
          {
            index: 90,
            count: 2,
            start: {
              value: 26.57,
              unit: "ms",
              raw: 26565100.000000004
            },
            end: {
              value: 26.83,
              unit: "ms",
              raw: 26830700
            }
          },
          {
            index: 91,
            count: 2,
            start: {
              value: 26.83,
              unit: "ms",
              raw: 26830700
            },
            end: {
              value: 27.1,
              unit: "ms",
              raw: 27096399.999999996
            }
          },
          {
            index: 92,
            count: 2,
            start: {
              value: 27.1,
              unit: "ms",
              raw: 27096399.999999996
            },
            end: {
              value: 27.36,
              unit: "ms",
              raw: 27362000
            }
          },
          {
            index: 93,
            count: 2,
            start: {
              value: 27.36,
              unit: "ms",
              raw: 27362000
            },
            end: {
              value: 27.63,
              unit: "ms",
              raw: 27627700
            }
          },
          {
            index: 94,
            count: 2,
            start: {
              value: 27.63,
              unit: "ms",
              raw: 27627700
            },
            end: {
              value: 27.89,
              unit: "ms",
              raw: 27893300
            }
          },
          {
            index: 95,
            count: 2,
            start: {
              value: 27.89,
              unit: "ms",
              raw: 27893300
            },
            end: {
              value: 28.16,
              unit: "ms",
              raw: 28159000
            }
          },
          {
            index: 96,
            count: 2,
            start: {
              value: 28.16,
              unit: "ms",
              raw: 28159000
            },
            end: {
              value: 28.42,
              unit: "ms",
              raw: 28424600.000000004
            }
          },
          {
            index: 97,
            count: 2,
            start: {
              value: 28.42,
              unit: "ms",
              raw: 28424600.000000004
            },
            end: {
              value: 28.69,
              unit: "ms",
              raw: 28690300
            }
          },
          {
            index: 98,
            count: 1,
            start: {
              value: 28.69,
              unit: "ms",
              raw: 28690300
            },
            end: {
              value: 28.96,
              unit: "ms",
              raw: 28955900
            }
          },
          {
            index: 99,
            count: 1,
            start: {
              value: 28.96,
              unit: "ms",
              raw: 28955900
            },
            end: {
              value: 29.22,
              unit: "ms",
              raw: 29221600
            }
          },
          {
            index: 100,
            count: 1,
            start: {
              value: 29.22,
              unit: "ms",
              raw: 29221600
            },
            end: {
              value: 29.49,
              unit: "ms",
              raw: 29487200
            }
          },
          {
            index: 101,
            count: 1,
            start: {
              value: 29.49,
              unit: "ms",
              raw: 29487200
            },
            end: {
              value: 29.75,
              unit: "ms",
              raw: 29752900
            }
          },
          {
            index: 102,
            count: 1,
            start: {
              value: 29.75,
              unit: "ms",
              raw: 29752900
            },
            end: {
              value: 30.02,
              unit: "ms",
              raw: 30018500
            }
          },
          {
            index: 103,
            count: 1,
            start: {
              value: 30.02,
              unit: "ms",
              raw: 30018500
            },
            end: {
              value: 30.28,
              unit: "ms",
              raw: 30284199.999999996
            }
          },
          {
            index: 109,
            count: 2,
            start: {
              value: 31.61,
              unit: "ms",
              raw: 31612400
            },
            end: {
              value: 31.88,
              unit: "ms",
              raw: 31878100
            }
          },
          {
            index: 110,
            count: 2,
            start: {
              value: 31.88,
              unit: "ms",
              raw: 31878100
            },
            end: {
              value: 32.14,
              unit: "ms",
              raw: 32143700.000000004
            }
          },
          {
            index: 111,
            count: 2,
            start: {
              value: 32.14,
              unit: "ms",
              raw: 32143700.000000004
            },
            end: {
              value: 32.41,
              unit: "ms",
              raw: 32409399.999999996
            }
          },
          {
            index: 112,
            count: 2,
            start: {
              value: 32.41,
              unit: "ms",
              raw: 32409399.999999996
            },
            end: {
              value: 32.67,
              unit: "ms",
              raw: 32674999.999999996
            }
          },
          {
            index: 113,
            count: 2,
            start: {
              value: 32.67,
              unit: "ms",
              raw: 32674999.999999996
            },
            end: {
              value: 32.94,
              unit: "ms",
              raw: 32940699.999999996
            }
          },
          {
            index: 114,
            count: 2,
            start: {
              value: 32.94,
              unit: "ms",
              raw: 32940699.999999996
            },
            end: {
              value: 33.21,
              unit: "ms",
              raw: 33206299.999999996
            }
          },
          {
            index: 115,
            count: 2,
            start: {
              value: 33.21,
              unit: "ms",
              raw: 33206299.999999996
            },
            end: {
              value: 33.47,
              unit: "ms",
              raw: 33472000
            }
          },
          {
            index: 116,
            count: 2,
            start: {
              value: 33.47,
              unit: "ms",
              raw: 33472000
            },
            end: {
              value: 33.74,
              unit: "ms",
              raw: 33737600
            }
          },
          {
            index: 117,
            count: 2,
            start: {
              value: 33.74,
              unit: "ms",
              raw: 33737600
            },
            end: {
              value: 34,
              unit: "ms",
              raw: 34003300
            }
          },
          {
            index: 118,
            count: 1,
            start: {
              value: 34,
              unit: "ms",
              raw: 34003300
            },
            end: {
              value: 34.27,
              unit: "ms",
              raw: 34268900
            }
          },
          {
            index: 119,
            count: 1,
            start: {
              value: 34.27,
              unit: "ms",
              raw: 34268900
            },
            end: {
              value: 34.53,
              unit: "ms",
              raw: 34534600
            }
          },
          {
            index: 120,
            count: 1,
            start: {
              value: 34.53,
              unit: "ms",
              raw: 34534600
            },
            end: {
              value: 34.8,
              unit: "ms",
              raw: 34800200
            }
          },
          {
            index: 121,
            count: 2,
            start: {
              value: 34.8,
              unit: "ms",
              raw: 34800200
            },
            end: {
              value: 35.07,
              unit: "ms",
              raw: 35065900
            }
          },
          {
            index: 122,
            count: 2,
            start: {
              value: 35.07,
              unit: "ms",
              raw: 35065900
            },
            end: {
              value: 35.33,
              unit: "ms",
              raw: 35331600
            }
          },
          {
            index: 123,
            count: 2,
            start: {
              value: 35.33,
              unit: "ms",
              raw: 35331600
            },
            end: {
              value: 35.6,
              unit: "ms",
              raw: 35597200.00000001
            }
          },
          {
            index: 124,
            count: 2,
            start: {
              value: 35.6,
              unit: "ms",
              raw: 35597200.00000001
            },
            end: {
              value: 35.86,
              unit: "ms",
              raw: 35862900
            }
          },
          {
            index: 125,
            count: 2,
            start: {
              value: 35.86,
              unit: "ms",
              raw: 35862900
            },
            end: {
              value: 36.13,
              unit: "ms",
              raw: 36128500
            }
          },
          {
            index: 126,
            count: 2,
            start: {
              value: 36.13,
              unit: "ms",
              raw: 36128500
            },
            end: {
              value: 36.39,
              unit: "ms",
              raw: 36394200
            }
          },
          {
            index: 127,
            count: 2,
            start: {
              value: 36.39,
              unit: "ms",
              raw: 36394200
            },
            end: {
              value: 36.66,
              unit: "ms",
              raw: 36659799.99999999
            }
          },
          {
            index: 128,
            count: 2,
            start: {
              value: 36.66,
              unit: "ms",
              raw: 36659799.99999999
            },
            end: {
              value: 36.93,
              unit: "ms",
              raw: 36925500
            }
          },
          {
            index: 129,
            count: 1,
            start: {
              value: 36.93,
              unit: "ms",
              raw: 36925500
            },
            end: {
              value: 37.19,
              unit: "ms",
              raw: 37191100
            }
          },
          {
            index: 130,
            count: 1,
            start: {
              value: 37.19,
              unit: "ms",
              raw: 37191100
            },
            end: {
              value: 37.46,
              unit: "ms",
              raw: 37456800
            }
          },
          {
            index: 131,
            count: 1,
            start: {
              value: 37.46,
              unit: "ms",
              raw: 37456800
            },
            end: {
              value: 37.72,
              unit: "ms",
              raw: 37722400
            }
          },
          {
            index: 132,
            count: 1,
            start: {
              value: 37.72,
              unit: "ms",
              raw: 37722400
            },
            end: {
              value: 37.99,
              unit: "ms",
              raw: 37988100.00000001
            }
          },
          {
            index: 133,
            count: 1,
            start: {
              value: 37.99,
              unit: "ms",
              raw: 37988100.00000001
            },
            end: {
              value: 38.25,
              unit: "ms",
              raw: 38253700.00000001
            }
          },
          {
            index: 134,
            count: 2,
            start: {
              value: 38.25,
              unit: "ms",
              raw: 38253700.00000001
            },
            end: {
              value: 38.52,
              unit: "ms",
              raw: 38519399.99999999
            }
          },
          {
            index: 135,
            count: 2,
            start: {
              value: 38.52,
              unit: "ms",
              raw: 38519399.99999999
            },
            end: {
              value: 38.78,
              unit: "ms",
              raw: 38785000
            }
          },
          {
            index: 136,
            count: 2,
            start: {
              value: 38.78,
              unit: "ms",
              raw: 38785000
            },
            end: {
              value: 39.05,
              unit: "ms",
              raw: 39050700
            }
          },
          {
            index: 137,
            count: 2,
            start: {
              value: 39.05,
              unit: "ms",
              raw: 39050700
            },
            end: {
              value: 39.32,
              unit: "ms",
              raw: 39316299.99999999
            }
          },
          {
            index: 138,
            count: 2,
            start: {
              value: 39.32,
              unit: "ms",
              raw: 39316299.99999999
            },
            end: {
              value: 39.58,
              unit: "ms",
              raw: 39582000
            }
          },
          {
            index: 139,
            count: 2,
            start: {
              value: 39.58,
              unit: "ms",
              raw: 39582000
            },
            end: {
              value: 39.85,
              unit: "ms",
              raw: 39847600
            }
          },
          {
            index: 140,
            count: 2,
            start: {
              value: 39.85,
              unit: "ms",
              raw: 39847600
            },
            end: {
              value: 40.11,
              unit: "ms",
              raw: 40113300
            }
          },
          {
            index: 141,
            count: 1,
            start: {
              value: 40.11,
              unit: "ms",
              raw: 40113300
            },
            end: {
              value: 40.38,
              unit: "ms",
              raw: 40378900
            }
          },
          {
            index: 142,
            count: 1,
            start: {
              value: 40.38,
              unit: "ms",
              raw: 40378900
            },
            end: {
              value: 40.64,
              unit: "ms",
              raw: 40644600
            }
          },
          {
            index: 143,
            count: 1,
            start: {
              value: 40.64,
              unit: "ms",
              raw: 40644600
            },
            end: {
              value: 40.91,
              unit: "ms",
              raw: 40910200.00000001
            }
          },
          {
            index: 144,
            count: 1,
            start: {
              value: 40.91,
              unit: "ms",
              raw: 40910200.00000001
            },
            end: {
              value: 41.18,
              unit: "ms",
              raw: 41175900
            }
          },
          {
            index: 145,
            count: 1,
            start: {
              value: 41.18,
              unit: "ms",
              raw: 41175900
            },
            end: {
              value: 41.44,
              unit: "ms",
              raw: 41441500
            }
          },
          {
            index: 146,
            count: 1,
            start: {
              value: 41.44,
              unit: "ms",
              raw: 41441500
            },
            end: {
              value: 41.71,
              unit: "ms",
              raw: 41707200
            }
          },
          {
            index: 147,
            count: 1,
            start: {
              value: 41.71,
              unit: "ms",
              raw: 41707200
            },
            end: {
              value: 41.97,
              unit: "ms",
              raw: 41972800
            }
          },
          {
            index: 148,
            count: 2,
            start: {
              value: 41.97,
              unit: "ms",
              raw: 41972800
            },
            end: {
              value: 42.24,
              unit: "ms",
              raw: 42238500
            }
          },
          {
            index: 149,
            count: 2,
            start: {
              value: 42.24,
              unit: "ms",
              raw: 42238500
            },
            end: {
              value: 42.5,
              unit: "ms",
              raw: 42504100
            }
          },
          {
            index: 150,
            count: 2,
            start: {
              value: 42.5,
              unit: "ms",
              raw: 42504100
            },
            end: {
              value: 42.77,
              unit: "ms",
              raw: 42769799.99999999
            }
          },
          {
            index: 151,
            count: 2,
            start: {
              value: 42.77,
              unit: "ms",
              raw: 42769799.99999999
            },
            end: {
              value: 43.04,
              unit: "ms",
              raw: 43035400
            }
          },
          {
            index: 152,
            count: 2,
            start: {
              value: 43.04,
              unit: "ms",
              raw: 43035400
            },
            end: {
              value: 43.3,
              unit: "ms",
              raw: 43301100
            }
          },
          {
            index: 153,
            count: 1,
            start: {
              value: 43.3,
              unit: "ms",
              raw: 43301100
            },
            end: {
              value: 43.57,
              unit: "ms",
              raw: 43566700
            }
          },
          {
            index: 154,
            count: 1,
            start: {
              value: 43.57,
              unit: "ms",
              raw: 43566700
            },
            end: {
              value: 43.83,
              unit: "ms",
              raw: 43832400
            }
          },
          {
            index: 155,
            count: 1,
            start: {
              value: 43.83,
              unit: "ms",
              raw: 43832400
            },
            end: {
              value: 44.1,
              unit: "ms",
              raw: 44098000
            }
          },
          {
            index: 156,
            count: 1,
            start: {
              value: 44.1,
              unit: "ms",
              raw: 44098000
            },
            end: {
              value: 44.36,
              unit: "ms",
              raw: 44363700.00000001
            }
          },
          {
            index: 157,
            count: 1,
            start: {
              value: 44.36,
              unit: "ms",
              raw: 44363700.00000001
            },
            end: {
              value: 44.63,
              unit: "ms",
              raw: 44629300
            }
          },
          {
            index: 158,
            count: 1,
            start: {
              value: 44.63,
              unit: "ms",
              raw: 44629300
            },
            end: {
              value: 44.9,
              unit: "ms",
              raw: 44895000
            }
          },
          {
            index: 159,
            count: 1,
            start: {
              value: 44.9,
              unit: "ms",
              raw: 44895000
            },
            end: {
              value: 45.16,
              unit: "ms",
              raw: 45160600.00000001
            }
          },
          {
            index: 160,
            count: 1,
            start: {
              value: 45.16,
              unit: "ms",
              raw: 45160600.00000001
            },
            end: {
              value: 45.43,
              unit: "ms",
              raw: 45426299.99999999
            }
          },
          {
            index: 161,
            count: 1,
            start: {
              value: 45.43,
              unit: "ms",
              raw: 45426299.99999999
            },
            end: {
              value: 45.69,
              unit: "ms",
              raw: 45691899.99999999
            }
          },
          {
            index: 162,
            count: 1,
            start: {
              value: 45.69,
              unit: "ms",
              raw: 45691899.99999999
            },
            end: {
              value: 45.96,
              unit: "ms",
              raw: 45957600
            }
          },
          {
            index: 163,
            count: 1,
            start: {
              value: 45.96,
              unit: "ms",
              raw: 45957600
            },
            end: {
              value: 46.22,
              unit: "ms",
              raw: 46223200
            }
          },
          {
            index: 164,
            count: 2,
            start: {
              value: 46.22,
              unit: "ms",
              raw: 46223200
            },
            end: {
              value: 46.49,
              unit: "ms",
              raw: 46488900
            }
          },
          {
            index: 165,
            count: 2,
            start: {
              value: 46.49,
              unit: "ms",
              raw: 46488900
            },
            end: {
              value: 46.75,
              unit: "ms",
              raw: 46754500
            }
          },
          {
            index: 166,
            count: 2,
            start: {
              value: 46.75,
              unit: "ms",
              raw: 46754500
            },
            end: {
              value: 47.02,
              unit: "ms",
              raw: 47020200.00000001
            }
          },
          {
            index: 167,
            count: 2,
            start: {
              value: 47.02,
              unit: "ms",
              raw: 47020200.00000001
            },
            end: {
              value: 47.29,
              unit: "ms",
              raw: 47285900
            }
          },
          {
            index: 168,
            count: 1,
            start: {
              value: 47.29,
              unit: "ms",
              raw: 47285900
            },
            end: {
              value: 47.55,
              unit: "ms",
              raw: 47551500
            }
          },
          {
            index: 169,
            count: 1,
            start: {
              value: 47.55,
              unit: "ms",
              raw: 47551500
            },
            end: {
              value: 47.82,
              unit: "ms",
              raw: 47817200
            }
          },
          {
            index: 170,
            count: 1,
            start: {
              value: 47.82,
              unit: "ms",
              raw: 47817200
            },
            end: {
              value: 48.08,
              unit: "ms",
              raw: 48082799.99999999
            }
          },
          {
            index: 171,
            count: 1,
            start: {
              value: 48.08,
              unit: "ms",
              raw: 48082799.99999999
            },
            end: {
              value: 48.35,
              unit: "ms",
              raw: 48348500
            }
          },
          {
            index: 172,
            count: 1,
            start: {
              value: 48.35,
              unit: "ms",
              raw: 48348500
            },
            end: {
              value: 48.61,
              unit: "ms",
              raw: 48614100
            }
          },
          {
            index: 173,
            count: 1,
            start: {
              value: 48.61,
              unit: "ms",
              raw: 48614100
            },
            end: {
              value: 48.88,
              unit: "ms",
              raw: 48879800
            }
          },
          {
            index: 174,
            count: 1,
            start: {
              value: 48.88,
              unit: "ms",
              raw: 48879800
            },
            end: {
              value: 49.15,
              unit: "ms",
              raw: 49145400
            }
          },
          {
            index: 175,
            count: 1,
            start: {
              value: 49.15,
              unit: "ms",
              raw: 49145400
            },
            end: {
              value: 49.41,
              unit: "ms",
              raw: 49411100
            }
          },
          {
            index: 176,
            count: 1,
            start: {
              value: 49.41,
              unit: "ms",
              raw: 49411100
            },
            end: {
              value: 49.68,
              unit: "ms",
              raw: 49676700
            }
          },
          {
            index: 177,
            count: 1,
            start: {
              value: 49.68,
              unit: "ms",
              raw: 49676700
            },
            end: {
              value: 49.94,
              unit: "ms",
              raw: 49942400
            }
          },
          {
            index: 178,
            count: 1,
            start: {
              value: 49.94,
              unit: "ms",
              raw: 49942400
            },
            end: {
              value: 50.21,
              unit: "ms",
              raw: 50208000
            }
          },
          {
            index: 179,
            count: 1,
            start: {
              value: 50.21,
              unit: "ms",
              raw: 50208000
            },
            end: {
              value: 50.47,
              unit: "ms",
              raw: 50473700.00000001
            }
          },
          {
            index: 180,
            count: 1,
            start: {
              value: 50.47,
              unit: "ms",
              raw: 50473700.00000001
            },
            end: {
              value: 50.74,
              unit: "ms",
              raw: 50739300
            }
          },
          {
            index: 181,
            count: 2,
            start: {
              value: 50.74,
              unit: "ms",
              raw: 50739300
            },
            end: {
              value: 51,
              unit: "ms",
              raw: 51005000
            }
          },
          {
            index: 182,
            count: 1,
            start: {
              value: 51,
              unit: "ms",
              raw: 51005000
            },
            end: {
              value: 51.27,
              unit: "ms",
              raw: 51270600
            }
          },
          {
            index: 183,
            count: 1,
            start: {
              value: 51.27,
              unit: "ms",
              raw: 51270600
            },
            end: {
              value: 51.54,
              unit: "ms",
              raw: 51536299.99999999
            }
          },
          {
            index: 184,
            count: 1,
            start: {
              value: 51.54,
              unit: "ms",
              raw: 51536299.99999999
            },
            end: {
              value: 51.8,
              unit: "ms",
              raw: 51801900
            }
          },
          {
            index: 185,
            count: 1,
            start: {
              value: 51.8,
              unit: "ms",
              raw: 51801900
            },
            end: {
              value: 52.07,
              unit: "ms",
              raw: 52067600
            }
          },
          {
            index: 186,
            count: 1,
            start: {
              value: 52.07,
              unit: "ms",
              raw: 52067600
            },
            end: {
              value: 52.33,
              unit: "ms",
              raw: 52333200
            }
          },
          {
            index: 187,
            count: 1,
            start: {
              value: 52.33,
              unit: "ms",
              raw: 52333200
            },
            end: {
              value: 52.6,
              unit: "ms",
              raw: 52598900
            }
          },
          {
            index: 188,
            count: 1,
            start: {
              value: 52.6,
              unit: "ms",
              raw: 52598900
            },
            end: {
              value: 52.86,
              unit: "ms",
              raw: 52864500
            }
          },
          {
            index: 189,
            count: 1,
            start: {
              value: 52.86,
              unit: "ms",
              raw: 52864500
            },
            end: {
              value: 53.13,
              unit: "ms",
              raw: 53130200.00000001
            }
          },
          {
            index: 190,
            count: 1,
            start: {
              value: 53.13,
              unit: "ms",
              raw: 53130200.00000001
            },
            end: {
              value: 53.4,
              unit: "ms",
              raw: 53395800
            }
          },
          {
            index: 191,
            count: 1,
            start: {
              value: 53.4,
              unit: "ms",
              raw: 53395800
            },
            end: {
              value: 53.66,
              unit: "ms",
              raw: 53661500
            }
          },
          {
            index: 192,
            count: 1,
            start: {
              value: 53.66,
              unit: "ms",
              raw: 53661500
            },
            end: {
              value: 53.93,
              unit: "ms",
              raw: 53927100.00000001
            }
          },
          {
            index: 193,
            count: 1,
            start: {
              value: 53.93,
              unit: "ms",
              raw: 53927100.00000001
            },
            end: {
              value: 54.19,
              unit: "ms",
              raw: 54192799.99999999
            }
          },
          {
            index: 194,
            count: 1,
            start: {
              value: 54.19,
              unit: "ms",
              raw: 54192799.99999999
            },
            end: {
              value: 54.46,
              unit: "ms",
              raw: 54458399.99999999
            }
          },
          {
            index: 195,
            count: 1,
            start: {
              value: 54.46,
              unit: "ms",
              raw: 54458399.99999999
            },
            end: {
              value: 54.72,
              unit: "ms",
              raw: 54724100
            }
          },
          {
            index: 196,
            count: 1,
            start: {
              value: 54.72,
              unit: "ms",
              raw: 54724100
            },
            end: {
              value: 54.99,
              unit: "ms",
              raw: 54989700
            }
          },
          {
            index: 197,
            count: 1,
            start: {
              value: 54.99,
              unit: "ms",
              raw: 54989700
            },
            end: {
              value: 55.26,
              unit: "ms",
              raw: 55255400
            }
          },
          {
            index: 198,
            count: 1,
            start: {
              value: 55.26,
              unit: "ms",
              raw: 55255400
            },
            end: {
              value: 55.52,
              unit: "ms",
              raw: 55521000
            }
          },
          {
            index: 199,
            count: 1,
            start: {
              value: 55.52,
              unit: "ms",
              raw: 55521000
            },
            end: {
              value: 55.79,
              unit: "ms",
              raw: 55786700.00000001
            }
          },
          {
            index: 200,
            count: 1,
            start: {
              value: 55.79,
              unit: "ms",
              raw: 55786700.00000001
            },
            end: {
              value: 56.05,
              unit: "ms",
              raw: 56052300
            }
          },
          {
            index: 201,
            count: 2,
            start: {
              value: 56.05,
              unit: "ms",
              raw: 56052300
            },
            end: {
              value: 56.32,
              unit: "ms",
              raw: 56318000
            }
          },
          {
            index: 202,
            count: 2,
            start: {
              value: 56.32,
              unit: "ms",
              raw: 56318000
            },
            end: {
              value: 56.58,
              unit: "ms",
              raw: 56583600
            }
          },
          {
            index: 203,
            count: 2,
            start: {
              value: 56.58,
              unit: "ms",
              raw: 56583600
            },
            end: {
              value: 56.85,
              unit: "ms",
              raw: 56849300
            }
          },
          {
            index: 204,
            count: 2,
            start: {
              value: 56.85,
              unit: "ms",
              raw: 56849300
            },
            end: {
              value: 57.11,
              unit: "ms",
              raw: 57114900
            }
          },
          {
            index: 205,
            count: 2,
            start: {
              value: 57.11,
              unit: "ms",
              raw: 57114900
            },
            end: {
              value: 57.38,
              unit: "ms",
              raw: 57380600
            }
          },
          {
            index: 206,
            count: 2,
            start: {
              value: 57.38,
              unit: "ms",
              raw: 57380600
            },
            end: {
              value: 57.65,
              unit: "ms",
              raw: 57646200
            }
          },
          {
            index: 207,
            count: 2,
            start: {
              value: 57.65,
              unit: "ms",
              raw: 57646200
            },
            end: {
              value: 57.91,
              unit: "ms",
              raw: 57911900
            }
          },
          {
            index: 208,
            count: 2,
            start: {
              value: 57.91,
              unit: "ms",
              raw: 57911900
            },
            end: {
              value: 58.18,
              unit: "ms",
              raw: 58177500
            }
          },
          {
            index: 209,
            count: 1,
            start: {
              value: 58.18,
              unit: "ms",
              raw: 58177500
            },
            end: {
              value: 58.44,
              unit: "ms",
              raw: 58443200
            }
          },
          {
            index: 210,
            count: 1,
            start: {
              value: 58.44,
              unit: "ms",
              raw: 58443200
            },
            end: {
              value: 58.71,
              unit: "ms",
              raw: 58708799.99999999
            }
          },
          {
            index: 211,
            count: 1,
            start: {
              value: 58.71,
              unit: "ms",
              raw: 58708799.99999999
            },
            end: {
              value: 58.97,
              unit: "ms",
              raw: 58974500
            }
          },
          {
            index: 212,
            count: 1,
            start: {
              value: 58.97,
              unit: "ms",
              raw: 58974500
            },
            end: {
              value: 59.24,
              unit: "ms",
              raw: 59240200.00000001
            }
          },
          {
            index: 213,
            count: 1,
            start: {
              value: 59.24,
              unit: "ms",
              raw: 59240200.00000001
            },
            end: {
              value: 59.51,
              unit: "ms",
              raw: 59505800
            }
          },
          {
            index: 214,
            count: 1,
            start: {
              value: 59.51,
              unit: "ms",
              raw: 59505800
            },
            end: {
              value: 59.77,
              unit: "ms",
              raw: 59771500
            }
          },
          {
            index: 215,
            count: 1,
            start: {
              value: 59.77,
              unit: "ms",
              raw: 59771500
            },
            end: {
              value: 60.04,
              unit: "ms",
              raw: 60037100.00000001
            }
          },
          {
            index: 216,
            count: 1,
            start: {
              value: 60.04,
              unit: "ms",
              raw: 60037100.00000001
            },
            end: {
              value: 60.3,
              unit: "ms",
              raw: 60302799.99999999
            }
          },
          {
            index: 217,
            count: 1,
            start: {
              value: 60.3,
              unit: "ms",
              raw: 60302799.99999999
            },
            end: {
              value: 60.57,
              unit: "ms",
              raw: 60568399.99999999
            }
          },
          {
            index: 218,
            count: 1,
            start: {
              value: 60.57,
              unit: "ms",
              raw: 60568399.99999999
            },
            end: {
              value: 60.83,
              unit: "ms",
              raw: 60834100
            }
          },
          {
            index: 219,
            count: 1,
            start: {
              value: 60.83,
              unit: "ms",
              raw: 60834100
            },
            end: {
              value: 61.1,
              unit: "ms",
              raw: 61099700
            }
          },
          {
            index: 220,
            count: 1,
            start: {
              value: 61.1,
              unit: "ms",
              raw: 61099700
            },
            end: {
              value: 61.37,
              unit: "ms",
              raw: 61365400
            }
          },
          {
            index: 221,
            count: 1,
            start: {
              value: 61.37,
              unit: "ms",
              raw: 61365400
            },
            end: {
              value: 61.63,
              unit: "ms",
              raw: 61631000
            }
          },
          {
            index: 222,
            count: 1,
            start: {
              value: 61.63,
              unit: "ms",
              raw: 61631000
            },
            end: {
              value: 61.9,
              unit: "ms",
              raw: 61896700.00000001
            }
          },
          {
            index: 223,
            count: 1,
            start: {
              value: 61.9,
              unit: "ms",
              raw: 61896700.00000001
            },
            end: {
              value: 62.16,
              unit: "ms",
              raw: 62162300
            }
          },
          {
            index: 224,
            count: 1,
            start: {
              value: 62.16,
              unit: "ms",
              raw: 62162300
            },
            end: {
              value: 62.43,
              unit: "ms",
              raw: 62428000
            }
          },
          {
            index: 225,
            count: 1,
            start: {
              value: 62.43,
              unit: "ms",
              raw: 62428000
            },
            end: {
              value: 62.69,
              unit: "ms",
              raw: 62693600.00000001
            }
          },
          {
            index: 226,
            count: 1,
            start: {
              value: 62.69,
              unit: "ms",
              raw: 62693600.00000001
            },
            end: {
              value: 62.96,
              unit: "ms",
              raw: 62959299.99999999
            }
          },
          {
            index: 227,
            count: 1,
            start: {
              value: 62.96,
              unit: "ms",
              raw: 62959299.99999999
            },
            end: {
              value: 63.22,
              unit: "ms",
              raw: 63224900
            }
          },
          {
            index: 228,
            count: 1,
            start: {
              value: 63.22,
              unit: "ms",
              raw: 63224900
            },
            end: {
              value: 63.49,
              unit: "ms",
              raw: 63490600
            }
          },
          {
            index: 229,
            count: 1,
            start: {
              value: 63.49,
              unit: "ms",
              raw: 63490600
            },
            end: {
              value: 63.76,
              unit: "ms",
              raw: 63756200
            }
          },
          {
            index: 230,
            count: 1,
            start: {
              value: 63.76,
              unit: "ms",
              raw: 63756200
            },
            end: {
              value: 64.02,
              unit: "ms",
              raw: 64021900
            }
          },
          {
            index: 245,
            count: 1,
            start: {
              value: 67.74,
              unit: "ms",
              raw: 67741000
            },
            end: {
              value: 68.01,
              unit: "ms",
              raw: 68006600
            }
          },
          {
            index: 246,
            count: 1,
            start: {
              value: 68.01,
              unit: "ms",
              raw: 68006600
            },
            end: {
              value: 68.27,
              unit: "ms",
              raw: 68272300
            }
          },
          {
            index: 247,
            count: 1,
            start: {
              value: 68.27,
              unit: "ms",
              raw: 68272300
            },
            end: {
              value: 68.54,
              unit: "ms",
              raw: 68537900
            }
          },
          {
            index: 248,
            count: 1,
            start: {
              value: 68.54,
              unit: "ms",
              raw: 68537900
            },
            end: {
              value: 68.8,
              unit: "ms",
              raw: 68803600
            }
          },
          {
            index: 249,
            count: 1,
            start: {
              value: 68.8,
              unit: "ms",
              raw: 68803600
            },
            end: {
              value: 69.07,
              unit: "ms",
              raw: 69069200
            }
          },
          {
            index: 250,
            count: 1,
            start: {
              value: 69.07,
              unit: "ms",
              raw: 69069200
            },
            end: {
              value: 69.33,
              unit: "ms",
              raw: 69334900.00000001
            }
          },
          {
            index: 251,
            count: 1,
            start: {
              value: 69.33,
              unit: "ms",
              raw: 69334900.00000001
            },
            end: {
              value: 69.6,
              unit: "ms",
              raw: 69600500
            }
          },
          {
            index: 252,
            count: 1,
            start: {
              value: 69.6,
              unit: "ms",
              raw: 69600500
            },
            end: {
              value: 69.87,
              unit: "ms",
              raw: 69866200.00000001
            }
          },
          {
            index: 253,
            count: 1,
            start: {
              value: 69.87,
              unit: "ms",
              raw: 69866200.00000001
            },
            end: {
              value: 70.13,
              unit: "ms",
              raw: 70131800
            }
          },
          {
            index: 254,
            count: 1,
            start: {
              value: 70.13,
              unit: "ms",
              raw: 70131800
            },
            end: {
              value: 70.4,
              unit: "ms",
              raw: 70397500
            }
          },
          {
            index: 255,
            count: 1,
            start: {
              value: 70.4,
              unit: "ms",
              raw: 70397500
            },
            end: {
              value: 70.66,
              unit: "ms",
              raw: 70663200
            }
          },
          {
            index: 256,
            count: 1,
            start: {
              value: 70.66,
              unit: "ms",
              raw: 70663200
            },
            end: {
              value: 70.93,
              unit: "ms",
              raw: 70928799.99999999
            }
          },
          {
            index: 257,
            count: 1,
            start: {
              value: 70.93,
              unit: "ms",
              raw: 70928799.99999999
            },
            end: {
              value: 71.19,
              unit: "ms",
              raw: 71194500
            }
          },
          {
            index: 258,
            count: 1,
            start: {
              value: 71.19,
              unit: "ms",
              raw: 71194500
            },
            end: {
              value: 71.46,
              unit: "ms",
              raw: 71460099.99999999
            }
          },
          {
            index: 259,
            count: 1,
            start: {
              value: 71.46,
              unit: "ms",
              raw: 71460099.99999999
            },
            end: {
              value: 71.73,
              unit: "ms",
              raw: 71725800
            }
          },
          {
            index: 260,
            count: 1,
            start: {
              value: 71.73,
              unit: "ms",
              raw: 71725800
            },
            end: {
              value: 71.99,
              unit: "ms",
              raw: 71991400
            }
          },
          {
            index: 261,
            count: 1,
            start: {
              value: 71.99,
              unit: "ms",
              raw: 71991400
            },
            end: {
              value: 72.26,
              unit: "ms",
              raw: 72257099.99999999
            }
          },
          {
            index: 262,
            count: 1,
            start: {
              value: 72.26,
              unit: "ms",
              raw: 72257099.99999999
            },
            end: {
              value: 72.52,
              unit: "ms",
              raw: 72522700
            }
          },
          {
            index: 271,
            count: 1,
            start: {
              value: 74.65,
              unit: "ms",
              raw: 74647900.00000001
            },
            end: {
              value: 74.91,
              unit: "ms",
              raw: 74913600
            }
          },
          {
            index: 272,
            count: 1,
            start: {
              value: 74.91,
              unit: "ms",
              raw: 74913600
            },
            end: {
              value: 75.18,
              unit: "ms",
              raw: 75179200
            }
          },
          {
            index: 273,
            count: 1,
            start: {
              value: 75.18,
              unit: "ms",
              raw: 75179200
            },
            end: {
              value: 75.44,
              unit: "ms",
              raw: 75444900.00000001
            }
          },
          {
            index: 274,
            count: 1,
            start: {
              value: 75.44,
              unit: "ms",
              raw: 75444900.00000001
            },
            end: {
              value: 75.71,
              unit: "ms",
              raw: 75710500
            }
          },
          {
            index: 275,
            count: 1,
            start: {
              value: 75.71,
              unit: "ms",
              raw: 75710500
            },
            end: {
              value: 75.98,
              unit: "ms",
              raw: 75976200.00000001
            }
          },
          {
            index: 276,
            count: 1,
            start: {
              value: 75.98,
              unit: "ms",
              raw: 75976200.00000001
            },
            end: {
              value: 76.24,
              unit: "ms",
              raw: 76241800
            }
          },
          {
            index: 277,
            count: 1,
            start: {
              value: 76.24,
              unit: "ms",
              raw: 76241800
            },
            end: {
              value: 76.51,
              unit: "ms",
              raw: 76507500
            }
          },
          {
            index: 278,
            count: 1,
            start: {
              value: 76.51,
              unit: "ms",
              raw: 76507500
            },
            end: {
              value: 76.77,
              unit: "ms",
              raw: 76773100
            }
          },
          {
            index: 279,
            count: 1,
            start: {
              value: 76.77,
              unit: "ms",
              raw: 76773100
            },
            end: {
              value: 77.04,
              unit: "ms",
              raw: 77038799.99999999
            }
          },
          {
            index: 280,
            count: 1,
            start: {
              value: 77.04,
              unit: "ms",
              raw: 77038799.99999999
            },
            end: {
              value: 77.3,
              unit: "ms",
              raw: 77304400
            }
          },
          {
            index: 281,
            count: 1,
            start: {
              value: 77.3,
              unit: "ms",
              raw: 77304400
            },
            end: {
              value: 77.57,
              unit: "ms",
              raw: 77570099.99999999
            }
          },
          {
            index: 282,
            count: 1,
            start: {
              value: 77.57,
              unit: "ms",
              raw: 77570099.99999999
            },
            end: {
              value: 77.84,
              unit: "ms",
              raw: 77835700
            }
          },
          {
            index: 283,
            count: 1,
            start: {
              value: 77.84,
              unit: "ms",
              raw: 77835700
            },
            end: {
              value: 78.1,
              unit: "ms",
              raw: 78101400
            }
          },
          {
            index: 284,
            count: 1,
            start: {
              value: 78.1,
              unit: "ms",
              raw: 78101400
            },
            end: {
              value: 78.37,
              unit: "ms",
              raw: 78367000
            }
          },
          {
            index: 285,
            count: 1,
            start: {
              value: 78.37,
              unit: "ms",
              raw: 78367000
            },
            end: {
              value: 78.63,
              unit: "ms",
              raw: 78632700
            }
          },
          {
            index: 286,
            count: 1,
            start: {
              value: 78.63,
              unit: "ms",
              raw: 78632700
            },
            end: {
              value: 78.9,
              unit: "ms",
              raw: 78898300
            }
          },
          {
            index: 287,
            count: 1,
            start: {
              value: 78.9,
              unit: "ms",
              raw: 78898300
            },
            end: {
              value: 79.16,
              unit: "ms",
              raw: 79164000
            }
          },
          {
            index: 288,
            count: 1,
            start: {
              value: 79.16,
              unit: "ms",
              raw: 79164000
            },
            end: {
              value: 79.43,
              unit: "ms",
              raw: 79429599.99999999
            }
          },
          {
            index: 299,
            count: 1,
            start: {
              value: 82.09,
              unit: "ms",
              raw: 82086100
            },
            end: {
              value: 82.35,
              unit: "ms",
              raw: 82351800
            }
          },
          {
            index: 300,
            count: 1,
            start: {
              value: 82.35,
              unit: "ms",
              raw: 82351800
            },
            end: {
              value: 82.62,
              unit: "ms",
              raw: 82617500
            }
          },
          {
            index: 301,
            count: 1,
            start: {
              value: 82.62,
              unit: "ms",
              raw: 82617500
            },
            end: {
              value: 82.88,
              unit: "ms",
              raw: 82883100
            }
          },
          {
            index: 302,
            count: 1,
            start: {
              value: 82.88,
              unit: "ms",
              raw: 82883100
            },
            end: {
              value: 83.15,
              unit: "ms",
              raw: 83148799.99999999
            }
          },
          {
            index: 303,
            count: 1,
            start: {
              value: 83.15,
              unit: "ms",
              raw: 83148799.99999999
            },
            end: {
              value: 83.41,
              unit: "ms",
              raw: 83414400
            }
          },
          {
            index: 304,
            count: 1,
            start: {
              value: 83.41,
              unit: "ms",
              raw: 83414400
            },
            end: {
              value: 83.68,
              unit: "ms",
              raw: 83680099.99999999
            }
          },
          {
            index: 305,
            count: 1,
            start: {
              value: 83.68,
              unit: "ms",
              raw: 83680099.99999999
            },
            end: {
              value: 83.95,
              unit: "ms",
              raw: 83945700
            }
          },
          {
            index: 306,
            count: 1,
            start: {
              value: 83.95,
              unit: "ms",
              raw: 83945700
            },
            end: {
              value: 84.21,
              unit: "ms",
              raw: 84211400
            }
          },
          {
            index: 307,
            count: 1,
            start: {
              value: 84.21,
              unit: "ms",
              raw: 84211400
            },
            end: {
              value: 84.48,
              unit: "ms",
              raw: 84477000
            }
          },
          {
            index: 308,
            count: 1,
            start: {
              value: 84.48,
              unit: "ms",
              raw: 84477000
            },
            end: {
              value: 84.74,
              unit: "ms",
              raw: 84742700
            }
          },
          {
            index: 309,
            count: 1,
            start: {
              value: 84.74,
              unit: "ms",
              raw: 84742700
            },
            end: {
              value: 85.01,
              unit: "ms",
              raw: 85008300
            }
          },
          {
            index: 310,
            count: 1,
            start: {
              value: 85.01,
              unit: "ms",
              raw: 85008300
            },
            end: {
              value: 85.27,
              unit: "ms",
              raw: 85274000
            }
          },
          {
            index: 311,
            count: 1,
            start: {
              value: 85.27,
              unit: "ms",
              raw: 85274000
            },
            end: {
              value: 85.54,
              unit: "ms",
              raw: 85539599.99999999
            }
          },
          {
            index: 312,
            count: 1,
            start: {
              value: 85.54,
              unit: "ms",
              raw: 85539599.99999999
            },
            end: {
              value: 85.81,
              unit: "ms",
              raw: 85805300
            }
          },
          {
            index: 313,
            count: 1,
            start: {
              value: 85.81,
              unit: "ms",
              raw: 85805300
            },
            end: {
              value: 86.07,
              unit: "ms",
              raw: 86070900
            }
          },
          {
            index: 314,
            count: 1,
            start: {
              value: 86.07,
              unit: "ms",
              raw: 86070900
            },
            end: {
              value: 86.34,
              unit: "ms",
              raw: 86336600
            }
          },
          {
            index: 315,
            count: 1,
            start: {
              value: 86.34,
              unit: "ms",
              raw: 86336600
            },
            end: {
              value: 86.6,
              unit: "ms",
              raw: 86602200
            }
          },
          {
            index: 316,
            count: 1,
            start: {
              value: 86.6,
              unit: "ms",
              raw: 86602200
            },
            end: {
              value: 86.87,
              unit: "ms",
              raw: 86867900.00000001
            }
          },
          {
            index: 330,
            count: 1,
            start: {
              value: 90.32,
              unit: "ms",
              raw: 90321299.99999999
            },
            end: {
              value: 90.59,
              unit: "ms",
              raw: 90587000
            }
          },
          {
            index: 331,
            count: 1,
            start: {
              value: 90.59,
              unit: "ms",
              raw: 90587000
            },
            end: {
              value: 90.85,
              unit: "ms",
              raw: 90852599.99999999
            }
          },
          {
            index: 332,
            count: 1,
            start: {
              value: 90.85,
              unit: "ms",
              raw: 90852599.99999999
            },
            end: {
              value: 91.12,
              unit: "ms",
              raw: 91118300
            }
          },
          {
            index: 333,
            count: 1,
            start: {
              value: 91.12,
              unit: "ms",
              raw: 91118300
            },
            end: {
              value: 91.38,
              unit: "ms",
              raw: 91383900
            }
          },
          {
            index: 334,
            count: 1,
            start: {
              value: 91.38,
              unit: "ms",
              raw: 91383900
            },
            end: {
              value: 91.65,
              unit: "ms",
              raw: 91649600
            }
          },
          {
            index: 335,
            count: 1,
            start: {
              value: 91.65,
              unit: "ms",
              raw: 91649600
            },
            end: {
              value: 91.92,
              unit: "ms",
              raw: 91915200
            }
          },
          {
            index: 336,
            count: 1,
            start: {
              value: 91.92,
              unit: "ms",
              raw: 91915200
            },
            end: {
              value: 92.18,
              unit: "ms",
              raw: 92180900
            }
          },
          {
            index: 337,
            count: 1,
            start: {
              value: 92.18,
              unit: "ms",
              raw: 92180900
            },
            end: {
              value: 92.45,
              unit: "ms",
              raw: 92446500
            }
          },
          {
            index: 338,
            count: 1,
            start: {
              value: 92.45,
              unit: "ms",
              raw: 92446500
            },
            end: {
              value: 92.71,
              unit: "ms",
              raw: 92712200
            }
          },
          {
            index: 339,
            count: 1,
            start: {
              value: 92.71,
              unit: "ms",
              raw: 92712200
            },
            end: {
              value: 92.98,
              unit: "ms",
              raw: 92977800
            }
          },
          {
            index: 340,
            count: 1,
            start: {
              value: 92.98,
              unit: "ms",
              raw: 92977800
            },
            end: {
              value: 93.24,
              unit: "ms",
              raw: 93243500
            }
          },
          {
            index: 341,
            count: 1,
            start: {
              value: 93.24,
              unit: "ms",
              raw: 93243500
            },
            end: {
              value: 93.51,
              unit: "ms",
              raw: 93509100
            }
          },
          {
            index: 342,
            count: 1,
            start: {
              value: 93.51,
              unit: "ms",
              raw: 93509100
            },
            end: {
              value: 93.77,
              unit: "ms",
              raw: 93774800
            }
          },
          {
            index: 343,
            count: 1,
            start: {
              value: 93.77,
              unit: "ms",
              raw: 93774800
            },
            end: {
              value: 94.04,
              unit: "ms",
              raw: 94040500
            }
          },
          {
            index: 344,
            count: 1,
            start: {
              value: 94.04,
              unit: "ms",
              raw: 94040500
            },
            end: {
              value: 94.31,
              unit: "ms",
              raw: 94306100
            }
          },
          {
            index: 345,
            count: 1,
            start: {
              value: 94.31,
              unit: "ms",
              raw: 94306100
            },
            end: {
              value: 94.57,
              unit: "ms",
              raw: 94571800
            }
          },
          {
            index: 346,
            count: 1,
            start: {
              value: 94.57,
              unit: "ms",
              raw: 94571800
            },
            end: {
              value: 94.84,
              unit: "ms",
              raw: 94837400.00000001
            }
          },
          {
            index: 347,
            count: 1,
            start: {
              value: 94.84,
              unit: "ms",
              raw: 94837400.00000001
            },
            end: {
              value: 95.1,
              unit: "ms",
              raw: 95103099.99999999
            }
          },
          {
            index: 364,
            count: 1,
            start: {
              value: 99.35,
              unit: "ms",
              raw: 99353500
            },
            end: {
              value: 99.62,
              unit: "ms",
              raw: 99619100
            }
          },
          {
            index: 365,
            count: 1,
            start: {
              value: 99.62,
              unit: "ms",
              raw: 99619100
            },
            end: {
              value: 99.88,
              unit: "ms",
              raw: 99884800
            }
          },
          {
            index: 366,
            count: 1,
            start: {
              value: 99.88,
              unit: "ms",
              raw: 99884800
            },
            end: {
              value: 100.15,
              unit: "ms",
              raw: 100150400.00000001
            }
          },
          {
            index: 367,
            count: 1,
            start: {
              value: 100.15,
              unit: "ms",
              raw: 100150400.00000001
            },
            end: {
              value: 100.42,
              unit: "ms",
              raw: 100416100
            }
          },
          {
            index: 368,
            count: 1,
            start: {
              value: 100.42,
              unit: "ms",
              raw: 100416100
            },
            end: {
              value: 100.68,
              unit: "ms",
              raw: 100681700.00000001
            }
          },
          {
            index: 369,
            count: 1,
            start: {
              value: 100.68,
              unit: "ms",
              raw: 100681700.00000001
            },
            end: {
              value: 100.95,
              unit: "ms",
              raw: 100947400.00000001
            }
          },
          {
            index: 370,
            count: 1,
            start: {
              value: 100.95,
              unit: "ms",
              raw: 100947400.00000001
            },
            end: {
              value: 101.21,
              unit: "ms",
              raw: 101213000
            }
          },
          {
            index: 371,
            count: 1,
            start: {
              value: 101.21,
              unit: "ms",
              raw: 101213000
            },
            end: {
              value: 101.48,
              unit: "ms",
              raw: 101478700
            }
          },
          {
            index: 372,
            count: 1,
            start: {
              value: 101.48,
              unit: "ms",
              raw: 101478700
            },
            end: {
              value: 101.74,
              unit: "ms",
              raw: 101744299.99999999
            }
          },
          {
            index: 373,
            count: 1,
            start: {
              value: 101.74,
              unit: "ms",
              raw: 101744299.99999999
            },
            end: {
              value: 102.01,
              unit: "ms",
              raw: 102010000
            }
          },
          {
            index: 374,
            count: 1,
            start: {
              value: 102.01,
              unit: "ms",
              raw: 102010000
            },
            end: {
              value: 102.28,
              unit: "ms",
              raw: 102275599.99999999
            }
          },
          {
            index: 375,
            count: 1,
            start: {
              value: 102.28,
              unit: "ms",
              raw: 102275599.99999999
            },
            end: {
              value: 102.54,
              unit: "ms",
              raw: 102541300
            }
          },
          {
            index: 376,
            count: 1,
            start: {
              value: 102.54,
              unit: "ms",
              raw: 102541300
            },
            end: {
              value: 102.81,
              unit: "ms",
              raw: 102806900
            }
          },
          {
            index: 377,
            count: 1,
            start: {
              value: 102.81,
              unit: "ms",
              raw: 102806900
            },
            end: {
              value: 103.07,
              unit: "ms",
              raw: 103072599.99999999
            }
          },
          {
            index: 378,
            count: 1,
            start: {
              value: 103.07,
              unit: "ms",
              raw: 103072599.99999999
            },
            end: {
              value: 103.34,
              unit: "ms",
              raw: 103338200
            }
          },
          {
            index: 379,
            count: 1,
            start: {
              value: 103.34,
              unit: "ms",
              raw: 103338200
            },
            end: {
              value: 103.6,
              unit: "ms",
              raw: 103603900
            }
          },
          {
            index: 380,
            count: 1,
            start: {
              value: 103.6,
              unit: "ms",
              raw: 103603900
            },
            end: {
              value: 103.87,
              unit: "ms",
              raw: 103869500
            }
          },
          {
            index: 381,
            count: 1,
            start: {
              value: 103.87,
              unit: "ms",
              raw: 103869500
            },
            end: {
              value: 104.14,
              unit: "ms",
              raw: 104135200
            }
          },
          {
            index: 382,
            count: 1,
            start: {
              value: 104.14,
              unit: "ms",
              raw: 104135200
            },
            end: {
              value: 104.4,
              unit: "ms",
              raw: 104400800
            }
          },
          {
            index: 383,
            count: 1,
            start: {
              value: 104.4,
              unit: "ms",
              raw: 104400800
            },
            end: {
              value: 104.67,
              unit: "ms",
              raw: 104666500
            }
          },
          {
            index: 384,
            count: 1,
            start: {
              value: 104.67,
              unit: "ms",
              raw: 104666500
            },
            end: {
              value: 104.93,
              unit: "ms",
              raw: 104932100
            }
          },
          {
            index: 385,
            count: 1,
            start: {
              value: 104.93,
              unit: "ms",
              raw: 104932100
            },
            end: {
              value: 105.2,
              unit: "ms",
              raw: 105197800
            }
          },
          {
            index: 386,
            count: 1,
            start: {
              value: 105.2,
              unit: "ms",
              raw: 105197800
            },
            end: {
              value: 105.46,
              unit: "ms",
              raw: 105463400
            }
          },
          {
            index: 387,
            count: 1,
            start: {
              value: 105.46,
              unit: "ms",
              raw: 105463400
            },
            end: {
              value: 105.73,
              unit: "ms",
              raw: 105729100
            }
          },
          {
            index: 388,
            count: 1,
            start: {
              value: 105.73,
              unit: "ms",
              raw: 105729100
            },
            end: {
              value: 105.99,
              unit: "ms",
              raw: 105994800
            }
          },
          {
            index: 401,
            count: 1,
            start: {
              value: 109.18,
              unit: "ms",
              raw: 109182599.99999999
            },
            end: {
              value: 109.45,
              unit: "ms",
              raw: 109448200
            }
          },
          {
            index: 402,
            count: 1,
            start: {
              value: 109.45,
              unit: "ms",
              raw: 109448200
            },
            end: {
              value: 109.71,
              unit: "ms",
              raw: 109713900
            }
          },
          {
            index: 403,
            count: 1,
            start: {
              value: 109.71,
              unit: "ms",
              raw: 109713900
            },
            end: {
              value: 109.98,
              unit: "ms",
              raw: 109979500
            }
          },
          {
            index: 404,
            count: 1,
            start: {
              value: 109.98,
              unit: "ms",
              raw: 109979500
            },
            end: {
              value: 110.25,
              unit: "ms",
              raw: 110245200
            }
          },
          {
            index: 405,
            count: 1,
            start: {
              value: 110.25,
              unit: "ms",
              raw: 110245200
            },
            end: {
              value: 110.51,
              unit: "ms",
              raw: 110510800
            }
          },
          {
            index: 406,
            count: 1,
            start: {
              value: 110.51,
              unit: "ms",
              raw: 110510800
            },
            end: {
              value: 110.78,
              unit: "ms",
              raw: 110776500
            }
          },
          {
            index: 407,
            count: 1,
            start: {
              value: 110.78,
              unit: "ms",
              raw: 110776500
            },
            end: {
              value: 111.04,
              unit: "ms",
              raw: 111042100
            }
          },
          {
            index: 408,
            count: 1,
            start: {
              value: 111.04,
              unit: "ms",
              raw: 111042100
            },
            end: {
              value: 111.31,
              unit: "ms",
              raw: 111307800
            }
          },
          {
            index: 409,
            count: 1,
            start: {
              value: 111.31,
              unit: "ms",
              raw: 111307800
            },
            end: {
              value: 111.57,
              unit: "ms",
              raw: 111573400.00000001
            }
          },
          {
            index: 410,
            count: 1,
            start: {
              value: 111.57,
              unit: "ms",
              raw: 111573400.00000001
            },
            end: {
              value: 111.84,
              unit: "ms",
              raw: 111839100
            }
          },
          {
            index: 411,
            count: 1,
            start: {
              value: 111.84,
              unit: "ms",
              raw: 111839100
            },
            end: {
              value: 112.1,
              unit: "ms",
              raw: 112104700
            }
          },
          {
            index: 412,
            count: 1,
            start: {
              value: 112.1,
              unit: "ms",
              raw: 112104700
            },
            end: {
              value: 112.37,
              unit: "ms",
              raw: 112370400.00000001
            }
          },
          {
            index: 413,
            count: 1,
            start: {
              value: 112.37,
              unit: "ms",
              raw: 112370400.00000001
            },
            end: {
              value: 112.64,
              unit: "ms",
              raw: 112636000
            }
          },
          {
            index: 414,
            count: 1,
            start: {
              value: 112.64,
              unit: "ms",
              raw: 112636000
            },
            end: {
              value: 112.9,
              unit: "ms",
              raw: 112901700.00000001
            }
          },
          {
            index: 415,
            count: 1,
            start: {
              value: 112.9,
              unit: "ms",
              raw: 112901700.00000001
            },
            end: {
              value: 113.17,
              unit: "ms",
              raw: 113167300
            }
          },
          {
            index: 416,
            count: 1,
            start: {
              value: 113.17,
              unit: "ms",
              raw: 113167300
            },
            end: {
              value: 113.43,
              unit: "ms",
              raw: 113433000
            }
          }
        ],
        quantiles: [
          {
            timestamp: {
              value: 35.46,
              unit: "ms",
              raw: 35464400
            },
            quantileValue: 0.5
          },
          {
            timestamp: {
              value: 103.47,
              unit: "ms",
              raw: 103471050
            },
            quantileValue: 0.95
          }
        ]
      }
    }
  }
};

export const HistogramWithGaps: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: null,
      lastDetected: null,
      criticality: 0,
      firstCommitId: null,
      lastCommitId: null,
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      isDismissed: false,
      isDismissible: true,
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false,
      histogramPlot: {
        bars: [
          {
            index: 0,
            count: 5,
            start: {
              value: 10,
              unit: "ms",
              raw: 10000000
            },
            end: {
              value: 11,
              unit: "ms",
              raw: 11000000
            }
          },
          {
            index: 1,
            count: 7,
            start: {
              value: 11,
              unit: "ms",
              raw: 11000000
            },
            end: {
              value: 12,
              unit: "ms",
              raw: 12000000
            }
          },
          {
            index: 2,
            count: 6,
            start: {
              value: 12,
              unit: "ms",
              raw: 12000000
            },
            end: {
              value: 13,
              unit: "ms",
              raw: 13000000
            }
          },
          {
            index: 3,
            count: 4,
            start: {
              value: 13,
              unit: "ms",
              raw: 13000000
            },
            end: {
              value: 14,
              unit: "ms",
              raw: 14000000
            }
          },
          {
            index: 4,
            count: 3,
            start: {
              value: 14,
              unit: "ms",
              raw: 14000000
            },
            end: {
              value: 15,
              unit: "ms",
              raw: 15000000
            }
          },
          {
            index: 5,
            count: 1,
            start: {
              value: 15,
              unit: "ms",
              raw: 15000000
            },
            end: {
              value: 16,
              unit: "ms",
              raw: 16000000
            }
          },
          {
            index: 7,
            count: 1,
            start: {
              value: 17,
              unit: "ms",
              raw: 17000000
            },
            end: {
              value: 17,
              unit: "ms",
              raw: 17000000
            }
          },
          {
            index: 10,
            count: 2,
            start: {
              value: 20,
              unit: "ms",
              raw: 20000000
            },
            end: {
              value: 21,
              unit: "ms",
              raw: 21000000
            }
          },
          {
            index: 20,
            count: 1,
            start: {
              value: 30,
              unit: "ms",
              raw: 30000000
            },
            end: {
              value: 31,
              unit: "ms",
              raw: 31000000
            }
          }
        ],
        quantiles: [
          {
            timestamp: {
              value: 20.2,
              unit: "ms",
              raw: 20200000
            },
            quantileValue: 0.5
          },
          {
            timestamp: {
              value: 20.5,
              unit: "ms",
              raw: 20500000
            },
            quantileValue: 0.95
          }
        ]
      }
    }
  }
};

export const HistogramWithAFewBars: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
      id: "60b55792-8262-4c5d-9628-7cce7979ad6d",
      firstDetected: null,
      lastDetected: null,
      criticality: 0,
      firstCommitId: null,
      lastCommitId: null,
      deactivatedCommitId: null,
      reopenCount: 0,
      ticketLink: null,
      impact: 0,
      name: "Performance Stats",
      type: InsightType.SpanDurations,
      category: InsightCategory.Performance,
      specifity: 4,
      isRecalculateEnabled: true,
      spanCodeObjectId: "span:SampleInsightsController$_$DelayAsync",
      isDismissed: false,
      isDismissible: true,
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false,
      histogramPlot: {
        bars: [
          {
            index: 0,
            count: 5,
            start: {
              value: 1,
              unit: "ms",
              raw: 1000000
            },
            end: {
              value: 2,
              unit: "ms",
              raw: 2000000
            }
          },
          {
            index: 1,
            count: 7,
            start: {
              value: 2,
              unit: "ms",
              raw: 2000000
            },
            end: {
              value: 3,
              unit: "ms",
              raw: 3000000
            }
          },
          {
            index: 3,
            count: 6,
            start: {
              value: 5,
              unit: "ms",
              raw: 5000000
            },
            end: {
              value: 6,
              unit: "ms",
              raw: 6000000
            }
          }
        ],
        quantiles: []
      }
    }
  }
};
