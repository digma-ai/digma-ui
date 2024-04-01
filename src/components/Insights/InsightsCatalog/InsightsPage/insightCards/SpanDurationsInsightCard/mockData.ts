import {
  InsightCategory,
  InsightScope,
  InsightType,
  SpanDurationsInsight
} from "../../../../types";

export const mockedSpanDurationsInsight: SpanDurationsInsight = {
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
        value: 2.31,
        unit: "sec",
        raw: 2305005050
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
};
