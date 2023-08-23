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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false
    }
  }
};

export const HistogramWithManyBars: Story = {
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
      actualStartTime: "2023-06-17T00:00:00.000Z",
      isAsync: false,
      histogramData: {
        bars: [
          {
            index: 0,
            count: 30,
            start: "00:00:00.0026565",
            end: "00:00:00.0029221"
          },
          {
            index: 1,
            count: 3,
            start: "00:00:00.0029221",
            end: "00:00:00.0031878"
          },
          {
            index: 4,
            count: 10,
            start: "00:00:00.0037191",
            end: "00:00:00.0039847"
          },
          {
            index: 5,
            count: 9,
            start: "00:00:00.0039847",
            end: "00:00:00.0042504"
          },
          {
            index: 7,
            count: 3,
            start: "00:00:00.0045160",
            end: "00:00:00.0047817"
          },
          {
            index: 8,
            count: 2,
            start: "00:00:00.0047817",
            end: "00:00:00.0050473"
          },
          {
            index: 13,
            count: 2,
            start: "00:00:00.0061099",
            end: "00:00:00.0063756"
          },
          {
            index: 14,
            count: 2,
            start: "00:00:00.0063756",
            end: "00:00:00.0066412"
          },
          {
            index: 15,
            count: 1,
            start: "00:00:00.0066412",
            end: "00:00:00.0069069"
          },
          {
            index: 18,
            count: 6,
            start: "00:00:00.0074382",
            end: "00:00:00.0077038"
          },
          {
            index: 19,
            count: 6,
            start: "00:00:00.0077038",
            end: "00:00:00.0079695"
          },
          {
            index: 20,
            count: 6,
            start: "00:00:00.0079695",
            end: "00:00:00.0082351"
          },
          {
            index: 21,
            count: 2,
            start: "00:00:00.0082351",
            end: "00:00:00.0085008"
          },
          {
            index: 22,
            count: 2,
            start: "00:00:00.0085008",
            end: "00:00:00.0087664"
          },
          {
            index: 23,
            count: 1,
            start: "00:00:00.0087664",
            end: "00:00:00.0090321"
          },
          {
            index: 27,
            count: 2,
            start: "00:00:00.0098290",
            end: "00:00:00.0100947"
          },
          {
            index: 28,
            count: 1,
            start: "00:00:00.0100947",
            end: "00:00:00.0103603"
          },
          {
            index: 29,
            count: 1,
            start: "00:00:00.0103603",
            end: "00:00:00.0106260"
          },
          {
            index: 30,
            count: 1,
            start: "00:00:00.0106260",
            end: "00:00:00.0108916"
          },
          {
            index: 31,
            count: 5,
            start: "00:00:00.0108916",
            end: "00:00:00.0111573"
          },
          {
            index: 32,
            count: 5,
            start: "00:00:00.0111573",
            end: "00:00:00.0114229"
          },
          {
            index: 33,
            count: 4,
            start: "00:00:00.0114229",
            end: "00:00:00.0116886"
          },
          {
            index: 34,
            count: 4,
            start: "00:00:00.0116886",
            end: "00:00:00.0119543"
          },
          {
            index: 35,
            count: 1,
            start: "00:00:00.0119543",
            end: "00:00:00.0122199"
          },
          {
            index: 36,
            count: 1,
            start: "00:00:00.0122199",
            end: "00:00:00.0124856"
          },
          {
            index: 37,
            count: 1,
            start: "00:00:00.0124856",
            end: "00:00:00.0127512"
          },
          {
            index: 38,
            count: 1,
            start: "00:00:00.0127512",
            end: "00:00:00.0130169"
          },
          {
            index: 39,
            count: 1,
            start: "00:00:00.0130169",
            end: "00:00:00.0132825"
          },
          {
            index: 45,
            count: 5,
            start: "00:00:00.0146108",
            end: "00:00:00.0148764"
          },
          {
            index: 46,
            count: 4,
            start: "00:00:00.0148764",
            end: "00:00:00.0151421"
          },
          {
            index: 47,
            count: 4,
            start: "00:00:00.0151421",
            end: "00:00:00.0154077"
          },
          {
            index: 48,
            count: 4,
            start: "00:00:00.0154077",
            end: "00:00:00.0156734"
          },
          {
            index: 49,
            count: 4,
            start: "00:00:00.0156734",
            end: "00:00:00.0159390"
          },
          {
            index: 50,
            count: 4,
            start: "00:00:00.0159390",
            end: "00:00:00.0162047"
          },
          {
            index: 51,
            count: 1,
            start: "00:00:00.0162047",
            end: "00:00:00.0164703"
          },
          {
            index: 52,
            count: 1,
            start: "00:00:00.0164703",
            end: "00:00:00.0167360"
          },
          {
            index: 53,
            count: 1,
            start: "00:00:00.0167360",
            end: "00:00:00.0170016"
          },
          {
            index: 54,
            count: 1,
            start: "00:00:00.0170016",
            end: "00:00:00.0172673"
          },
          {
            index: 55,
            count: 1,
            start: "00:00:00.0172673",
            end: "00:00:00.0175329"
          },
          {
            index: 57,
            count: 1,
            start: "00:00:00.0177986",
            end: "00:00:00.0180642"
          },
          {
            index: 58,
            count: 1,
            start: "00:00:00.0180642",
            end: "00:00:00.0183299"
          },
          {
            index: 59,
            count: 1,
            start: "00:00:00.0183299",
            end: "00:00:00.0185955"
          },
          {
            index: 60,
            count: 1,
            start: "00:00:00.0185955",
            end: "00:00:00.0188612"
          },
          {
            index: 61,
            count: 1,
            start: "00:00:00.0188612",
            end: "00:00:00.0191268"
          },
          {
            index: 64,
            count: 4,
            start: "00:00:00.0196581",
            end: "00:00:00.0199238"
          },
          {
            index: 65,
            count: 3,
            start: "00:00:00.0199238",
            end: "00:00:00.0201894"
          },
          {
            index: 66,
            count: 3,
            start: "00:00:00.0201894",
            end: "00:00:00.0204551"
          },
          {
            index: 67,
            count: 3,
            start: "00:00:00.0204551",
            end: "00:00:00.0207207"
          },
          {
            index: 68,
            count: 3,
            start: "00:00:00.0207207",
            end: "00:00:00.0209864"
          },
          {
            index: 69,
            count: 3,
            start: "00:00:00.0209864",
            end: "00:00:00.0212520"
          },
          {
            index: 70,
            count: 3,
            start: "00:00:00.0212520",
            end: "00:00:00.0215177"
          },
          {
            index: 71,
            count: 1,
            start: "00:00:00.0215177",
            end: "00:00:00.0217833"
          },
          {
            index: 72,
            count: 1,
            start: "00:00:00.0217833",
            end: "00:00:00.0220490"
          },
          {
            index: 73,
            count: 1,
            start: "00:00:00.0220490",
            end: "00:00:00.0223146"
          },
          {
            index: 79,
            count: 3,
            start: "00:00:00.0236429",
            end: "00:00:00.0239086"
          },
          {
            index: 80,
            count: 3,
            start: "00:00:00.0239086",
            end: "00:00:00.0241742"
          },
          {
            index: 81,
            count: 3,
            start: "00:00:00.0241742",
            end: "00:00:00.0244399"
          },
          {
            index: 82,
            count: 3,
            start: "00:00:00.0244399",
            end: "00:00:00.0247055"
          },
          {
            index: 83,
            count: 2,
            start: "00:00:00.0247055",
            end: "00:00:00.0249712"
          },
          {
            index: 84,
            count: 2,
            start: "00:00:00.0249712",
            end: "00:00:00.0252368"
          },
          {
            index: 85,
            count: 2,
            start: "00:00:00.0252368",
            end: "00:00:00.0255025"
          },
          {
            index: 86,
            count: 2,
            start: "00:00:00.0255025",
            end: "00:00:00.0257681"
          },
          {
            index: 87,
            count: 2,
            start: "00:00:00.0257681",
            end: "00:00:00.0260338"
          },
          {
            index: 88,
            count: 3,
            start: "00:00:00.0260338",
            end: "00:00:00.0262994"
          },
          {
            index: 89,
            count: 3,
            start: "00:00:00.0262994",
            end: "00:00:00.0265651"
          },
          {
            index: 90,
            count: 2,
            start: "00:00:00.0265651",
            end: "00:00:00.0268307"
          },
          {
            index: 91,
            count: 2,
            start: "00:00:00.0268307",
            end: "00:00:00.0270964"
          },
          {
            index: 92,
            count: 2,
            start: "00:00:00.0270964",
            end: "00:00:00.0273620"
          },
          {
            index: 93,
            count: 2,
            start: "00:00:00.0273620",
            end: "00:00:00.0276277"
          },
          {
            index: 94,
            count: 2,
            start: "00:00:00.0276277",
            end: "00:00:00.0278933"
          },
          {
            index: 95,
            count: 2,
            start: "00:00:00.0278933",
            end: "00:00:00.0281590"
          },
          {
            index: 96,
            count: 2,
            start: "00:00:00.0281590",
            end: "00:00:00.0284246"
          },
          {
            index: 97,
            count: 2,
            start: "00:00:00.0284246",
            end: "00:00:00.0286903"
          },
          {
            index: 98,
            count: 1,
            start: "00:00:00.0286903",
            end: "00:00:00.0289559"
          },
          {
            index: 99,
            count: 1,
            start: "00:00:00.0289559",
            end: "00:00:00.0292216"
          },
          {
            index: 100,
            count: 1,
            start: "00:00:00.0292216",
            end: "00:00:00.0294872"
          },
          {
            index: 101,
            count: 1,
            start: "00:00:00.0294872",
            end: "00:00:00.0297529"
          },
          {
            index: 102,
            count: 1,
            start: "00:00:00.0297529",
            end: "00:00:00.0300185"
          },
          {
            index: 103,
            count: 1,
            start: "00:00:00.0300185",
            end: "00:00:00.0302842"
          },
          {
            index: 109,
            count: 2,
            start: "00:00:00.0316124",
            end: "00:00:00.0318781"
          },
          {
            index: 110,
            count: 2,
            start: "00:00:00.0318781",
            end: "00:00:00.0321437"
          },
          {
            index: 111,
            count: 2,
            start: "00:00:00.0321437",
            end: "00:00:00.0324094"
          },
          {
            index: 112,
            count: 2,
            start: "00:00:00.0324094",
            end: "00:00:00.0326750"
          },
          {
            index: 113,
            count: 2,
            start: "00:00:00.0326750",
            end: "00:00:00.0329407"
          },
          {
            index: 114,
            count: 2,
            start: "00:00:00.0329407",
            end: "00:00:00.0332063"
          },
          {
            index: 115,
            count: 2,
            start: "00:00:00.0332063",
            end: "00:00:00.0334720"
          },
          {
            index: 116,
            count: 2,
            start: "00:00:00.0334720",
            end: "00:00:00.0337376"
          },
          {
            index: 117,
            count: 2,
            start: "00:00:00.0337376",
            end: "00:00:00.0340033"
          },
          {
            index: 118,
            count: 1,
            start: "00:00:00.0340033",
            end: "00:00:00.0342689"
          },
          {
            index: 119,
            count: 1,
            start: "00:00:00.0342689",
            end: "00:00:00.0345346"
          },
          {
            index: 120,
            count: 1,
            start: "00:00:00.0345346",
            end: "00:00:00.0348002"
          },
          {
            index: 121,
            count: 2,
            start: "00:00:00.0348002",
            end: "00:00:00.0350659"
          },
          {
            index: 122,
            count: 2,
            start: "00:00:00.0350659",
            end: "00:00:00.0353316"
          },
          {
            index: 123,
            count: 2,
            start: "00:00:00.0353316",
            end: "00:00:00.0355972"
          },
          {
            index: 124,
            count: 2,
            start: "00:00:00.0355972",
            end: "00:00:00.0358629"
          },
          {
            index: 125,
            count: 2,
            start: "00:00:00.0358629",
            end: "00:00:00.0361285"
          },
          {
            index: 126,
            count: 2,
            start: "00:00:00.0361285",
            end: "00:00:00.0363942"
          },
          {
            index: 127,
            count: 2,
            start: "00:00:00.0363942",
            end: "00:00:00.0366598"
          },
          {
            index: 128,
            count: 2,
            start: "00:00:00.0366598",
            end: "00:00:00.0369255"
          },
          {
            index: 129,
            count: 1,
            start: "00:00:00.0369255",
            end: "00:00:00.0371911"
          },
          {
            index: 130,
            count: 1,
            start: "00:00:00.0371911",
            end: "00:00:00.0374568"
          },
          {
            index: 131,
            count: 1,
            start: "00:00:00.0374568",
            end: "00:00:00.0377224"
          },
          {
            index: 132,
            count: 1,
            start: "00:00:00.0377224",
            end: "00:00:00.0379881"
          },
          {
            index: 133,
            count: 1,
            start: "00:00:00.0379881",
            end: "00:00:00.0382537"
          },
          {
            index: 134,
            count: 2,
            start: "00:00:00.0382537",
            end: "00:00:00.0385194"
          },
          {
            index: 135,
            count: 2,
            start: "00:00:00.0385194",
            end: "00:00:00.0387850"
          },
          {
            index: 136,
            count: 2,
            start: "00:00:00.0387850",
            end: "00:00:00.0390507"
          },
          {
            index: 137,
            count: 2,
            start: "00:00:00.0390507",
            end: "00:00:00.0393163"
          },
          {
            index: 138,
            count: 2,
            start: "00:00:00.0393163",
            end: "00:00:00.0395820"
          },
          {
            index: 139,
            count: 2,
            start: "00:00:00.0395820",
            end: "00:00:00.0398476"
          },
          {
            index: 140,
            count: 2,
            start: "00:00:00.0398476",
            end: "00:00:00.0401133"
          },
          {
            index: 141,
            count: 1,
            start: "00:00:00.0401133",
            end: "00:00:00.0403789"
          },
          {
            index: 142,
            count: 1,
            start: "00:00:00.0403789",
            end: "00:00:00.0406446"
          },
          {
            index: 143,
            count: 1,
            start: "00:00:00.0406446",
            end: "00:00:00.0409102"
          },
          {
            index: 144,
            count: 1,
            start: "00:00:00.0409102",
            end: "00:00:00.0411759"
          },
          {
            index: 145,
            count: 1,
            start: "00:00:00.0411759",
            end: "00:00:00.0414415"
          },
          {
            index: 146,
            count: 1,
            start: "00:00:00.0414415",
            end: "00:00:00.0417072"
          },
          {
            index: 147,
            count: 1,
            start: "00:00:00.0417072",
            end: "00:00:00.0419728"
          },
          {
            index: 148,
            count: 2,
            start: "00:00:00.0419728",
            end: "00:00:00.0422385"
          },
          {
            index: 149,
            count: 2,
            start: "00:00:00.0422385",
            end: "00:00:00.0425041"
          },
          {
            index: 150,
            count: 2,
            start: "00:00:00.0425041",
            end: "00:00:00.0427698"
          },
          {
            index: 151,
            count: 2,
            start: "00:00:00.0427698",
            end: "00:00:00.0430354"
          },
          {
            index: 152,
            count: 2,
            start: "00:00:00.0430354",
            end: "00:00:00.0433011"
          },
          {
            index: 153,
            count: 1,
            start: "00:00:00.0433011",
            end: "00:00:00.0435667"
          },
          {
            index: 154,
            count: 1,
            start: "00:00:00.0435667",
            end: "00:00:00.0438324"
          },
          {
            index: 155,
            count: 1,
            start: "00:00:00.0438324",
            end: "00:00:00.0440980"
          },
          {
            index: 156,
            count: 1,
            start: "00:00:00.0440980",
            end: "00:00:00.0443637"
          },
          {
            index: 157,
            count: 1,
            start: "00:00:00.0443637",
            end: "00:00:00.0446293"
          },
          {
            index: 158,
            count: 1,
            start: "00:00:00.0446293",
            end: "00:00:00.0448950"
          },
          {
            index: 159,
            count: 1,
            start: "00:00:00.0448950",
            end: "00:00:00.0451606"
          },
          {
            index: 160,
            count: 1,
            start: "00:00:00.0451606",
            end: "00:00:00.0454263"
          },
          {
            index: 161,
            count: 1,
            start: "00:00:00.0454263",
            end: "00:00:00.0456919"
          },
          {
            index: 162,
            count: 1,
            start: "00:00:00.0456919",
            end: "00:00:00.0459576"
          },
          {
            index: 163,
            count: 1,
            start: "00:00:00.0459576",
            end: "00:00:00.0462232"
          },
          {
            index: 164,
            count: 2,
            start: "00:00:00.0462232",
            end: "00:00:00.0464889"
          },
          {
            index: 165,
            count: 2,
            start: "00:00:00.0464889",
            end: "00:00:00.0467545"
          },
          {
            index: 166,
            count: 2,
            start: "00:00:00.0467545",
            end: "00:00:00.0470202"
          },
          {
            index: 167,
            count: 2,
            start: "00:00:00.0470202",
            end: "00:00:00.0472859"
          },
          {
            index: 168,
            count: 1,
            start: "00:00:00.0472859",
            end: "00:00:00.0475515"
          },
          {
            index: 169,
            count: 1,
            start: "00:00:00.0475515",
            end: "00:00:00.0478172"
          },
          {
            index: 170,
            count: 1,
            start: "00:00:00.0478172",
            end: "00:00:00.0480828"
          },
          {
            index: 171,
            count: 1,
            start: "00:00:00.0480828",
            end: "00:00:00.0483485"
          },
          {
            index: 172,
            count: 1,
            start: "00:00:00.0483485",
            end: "00:00:00.0486141"
          },
          {
            index: 173,
            count: 1,
            start: "00:00:00.0486141",
            end: "00:00:00.0488798"
          },
          {
            index: 174,
            count: 1,
            start: "00:00:00.0488798",
            end: "00:00:00.0491454"
          },
          {
            index: 175,
            count: 1,
            start: "00:00:00.0491454",
            end: "00:00:00.0494111"
          },
          {
            index: 176,
            count: 1,
            start: "00:00:00.0494111",
            end: "00:00:00.0496767"
          },
          {
            index: 177,
            count: 1,
            start: "00:00:00.0496767",
            end: "00:00:00.0499424"
          },
          {
            index: 178,
            count: 1,
            start: "00:00:00.0499424",
            end: "00:00:00.0502080"
          },
          {
            index: 179,
            count: 1,
            start: "00:00:00.0502080",
            end: "00:00:00.0504737"
          },
          {
            index: 180,
            count: 1,
            start: "00:00:00.0504737",
            end: "00:00:00.0507393"
          },
          {
            index: 181,
            count: 2,
            start: "00:00:00.0507393",
            end: "00:00:00.0510050"
          },
          {
            index: 182,
            count: 1,
            start: "00:00:00.0510050",
            end: "00:00:00.0512706"
          },
          {
            index: 183,
            count: 1,
            start: "00:00:00.0512706",
            end: "00:00:00.0515363"
          },
          {
            index: 184,
            count: 1,
            start: "00:00:00.0515363",
            end: "00:00:00.0518019"
          },
          {
            index: 185,
            count: 1,
            start: "00:00:00.0518019",
            end: "00:00:00.0520676"
          },
          {
            index: 186,
            count: 1,
            start: "00:00:00.0520676",
            end: "00:00:00.0523332"
          },
          {
            index: 187,
            count: 1,
            start: "00:00:00.0523332",
            end: "00:00:00.0525989"
          },
          {
            index: 188,
            count: 1,
            start: "00:00:00.0525989",
            end: "00:00:00.0528645"
          },
          {
            index: 189,
            count: 1,
            start: "00:00:00.0528645",
            end: "00:00:00.0531302"
          },
          {
            index: 190,
            count: 1,
            start: "00:00:00.0531302",
            end: "00:00:00.0533958"
          },
          {
            index: 191,
            count: 1,
            start: "00:00:00.0533958",
            end: "00:00:00.0536615"
          },
          {
            index: 192,
            count: 1,
            start: "00:00:00.0536615",
            end: "00:00:00.0539271"
          },
          {
            index: 193,
            count: 1,
            start: "00:00:00.0539271",
            end: "00:00:00.0541928"
          },
          {
            index: 194,
            count: 1,
            start: "00:00:00.0541928",
            end: "00:00:00.0544584"
          },
          {
            index: 195,
            count: 1,
            start: "00:00:00.0544584",
            end: "00:00:00.0547241"
          },
          {
            index: 196,
            count: 1,
            start: "00:00:00.0547241",
            end: "00:00:00.0549897"
          },
          {
            index: 197,
            count: 1,
            start: "00:00:00.0549897",
            end: "00:00:00.0552554"
          },
          {
            index: 198,
            count: 1,
            start: "00:00:00.0552554",
            end: "00:00:00.0555210"
          },
          {
            index: 199,
            count: 1,
            start: "00:00:00.0555210",
            end: "00:00:00.0557867"
          },
          {
            index: 200,
            count: 1,
            start: "00:00:00.0557867",
            end: "00:00:00.0560523"
          },
          {
            index: 201,
            count: 2,
            start: "00:00:00.0560523",
            end: "00:00:00.0563180"
          },
          {
            index: 202,
            count: 2,
            start: "00:00:00.0563180",
            end: "00:00:00.0565836"
          },
          {
            index: 203,
            count: 2,
            start: "00:00:00.0565836",
            end: "00:00:00.0568493"
          },
          {
            index: 204,
            count: 2,
            start: "00:00:00.0568493",
            end: "00:00:00.0571149"
          },
          {
            index: 205,
            count: 2,
            start: "00:00:00.0571149",
            end: "00:00:00.0573806"
          },
          {
            index: 206,
            count: 2,
            start: "00:00:00.0573806",
            end: "00:00:00.0576462"
          },
          {
            index: 207,
            count: 2,
            start: "00:00:00.0576462",
            end: "00:00:00.0579119"
          },
          {
            index: 208,
            count: 2,
            start: "00:00:00.0579119",
            end: "00:00:00.0581775"
          },
          {
            index: 209,
            count: 1,
            start: "00:00:00.0581775",
            end: "00:00:00.0584432"
          },
          {
            index: 210,
            count: 1,
            start: "00:00:00.0584432",
            end: "00:00:00.0587088"
          },
          {
            index: 211,
            count: 1,
            start: "00:00:00.0587088",
            end: "00:00:00.0589745"
          },
          {
            index: 212,
            count: 1,
            start: "00:00:00.0589745",
            end: "00:00:00.0592402"
          },
          {
            index: 213,
            count: 1,
            start: "00:00:00.0592402",
            end: "00:00:00.0595058"
          },
          {
            index: 214,
            count: 1,
            start: "00:00:00.0595058",
            end: "00:00:00.0597715"
          },
          {
            index: 215,
            count: 1,
            start: "00:00:00.0597715",
            end: "00:00:00.0600371"
          },
          {
            index: 216,
            count: 1,
            start: "00:00:00.0600371",
            end: "00:00:00.0603028"
          },
          {
            index: 217,
            count: 1,
            start: "00:00:00.0603028",
            end: "00:00:00.0605684"
          },
          {
            index: 218,
            count: 1,
            start: "00:00:00.0605684",
            end: "00:00:00.0608341"
          },
          {
            index: 219,
            count: 1,
            start: "00:00:00.0608341",
            end: "00:00:00.0610997"
          },
          {
            index: 220,
            count: 1,
            start: "00:00:00.0610997",
            end: "00:00:00.0613654"
          },
          {
            index: 221,
            count: 1,
            start: "00:00:00.0613654",
            end: "00:00:00.0616310"
          },
          {
            index: 222,
            count: 1,
            start: "00:00:00.0616310",
            end: "00:00:00.0618967"
          },
          {
            index: 223,
            count: 1,
            start: "00:00:00.0618967",
            end: "00:00:00.0621623"
          },
          {
            index: 224,
            count: 1,
            start: "00:00:00.0621623",
            end: "00:00:00.0624280"
          },
          {
            index: 225,
            count: 1,
            start: "00:00:00.0624280",
            end: "00:00:00.0626936"
          },
          {
            index: 226,
            count: 1,
            start: "00:00:00.0626936",
            end: "00:00:00.0629593"
          },
          {
            index: 227,
            count: 1,
            start: "00:00:00.0629593",
            end: "00:00:00.0632249"
          },
          {
            index: 228,
            count: 1,
            start: "00:00:00.0632249",
            end: "00:00:00.0634906"
          },
          {
            index: 229,
            count: 1,
            start: "00:00:00.0634906",
            end: "00:00:00.0637562"
          },
          {
            index: 230,
            count: 1,
            start: "00:00:00.0637562",
            end: "00:00:00.0640219"
          },
          {
            index: 245,
            count: 1,
            start: "00:00:00.0677410",
            end: "00:00:00.0680066"
          },
          {
            index: 246,
            count: 1,
            start: "00:00:00.0680066",
            end: "00:00:00.0682723"
          },
          {
            index: 247,
            count: 1,
            start: "00:00:00.0682723",
            end: "00:00:00.0685379"
          },
          {
            index: 248,
            count: 1,
            start: "00:00:00.0685379",
            end: "00:00:00.0688036"
          },
          {
            index: 249,
            count: 1,
            start: "00:00:00.0688036",
            end: "00:00:00.0690692"
          },
          {
            index: 250,
            count: 1,
            start: "00:00:00.0690692",
            end: "00:00:00.0693349"
          },
          {
            index: 251,
            count: 1,
            start: "00:00:00.0693349",
            end: "00:00:00.0696005"
          },
          {
            index: 252,
            count: 1,
            start: "00:00:00.0696005",
            end: "00:00:00.0698662"
          },
          {
            index: 253,
            count: 1,
            start: "00:00:00.0698662",
            end: "00:00:00.0701318"
          },
          {
            index: 254,
            count: 1,
            start: "00:00:00.0701318",
            end: "00:00:00.0703975"
          },
          {
            index: 255,
            count: 1,
            start: "00:00:00.0703975",
            end: "00:00:00.0706632"
          },
          {
            index: 256,
            count: 1,
            start: "00:00:00.0706632",
            end: "00:00:00.0709288"
          },
          {
            index: 257,
            count: 1,
            start: "00:00:00.0709288",
            end: "00:00:00.0711945"
          },
          {
            index: 258,
            count: 1,
            start: "00:00:00.0711945",
            end: "00:00:00.0714601"
          },
          {
            index: 259,
            count: 1,
            start: "00:00:00.0714601",
            end: "00:00:00.0717258"
          },
          {
            index: 260,
            count: 1,
            start: "00:00:00.0717258",
            end: "00:00:00.0719914"
          },
          {
            index: 261,
            count: 1,
            start: "00:00:00.0719914",
            end: "00:00:00.0722571"
          },
          {
            index: 262,
            count: 1,
            start: "00:00:00.0722571",
            end: "00:00:00.0725227"
          },
          {
            index: 271,
            count: 1,
            start: "00:00:00.0746479",
            end: "00:00:00.0749136"
          },
          {
            index: 272,
            count: 1,
            start: "00:00:00.0749136",
            end: "00:00:00.0751792"
          },
          {
            index: 273,
            count: 1,
            start: "00:00:00.0751792",
            end: "00:00:00.0754449"
          },
          {
            index: 274,
            count: 1,
            start: "00:00:00.0754449",
            end: "00:00:00.0757105"
          },
          {
            index: 275,
            count: 1,
            start: "00:00:00.0757105",
            end: "00:00:00.0759762"
          },
          {
            index: 276,
            count: 1,
            start: "00:00:00.0759762",
            end: "00:00:00.0762418"
          },
          {
            index: 277,
            count: 1,
            start: "00:00:00.0762418",
            end: "00:00:00.0765075"
          },
          {
            index: 278,
            count: 1,
            start: "00:00:00.0765075",
            end: "00:00:00.0767731"
          },
          {
            index: 279,
            count: 1,
            start: "00:00:00.0767731",
            end: "00:00:00.0770388"
          },
          {
            index: 280,
            count: 1,
            start: "00:00:00.0770388",
            end: "00:00:00.0773044"
          },
          {
            index: 281,
            count: 1,
            start: "00:00:00.0773044",
            end: "00:00:00.0775701"
          },
          {
            index: 282,
            count: 1,
            start: "00:00:00.0775701",
            end: "00:00:00.0778357"
          },
          {
            index: 283,
            count: 1,
            start: "00:00:00.0778357",
            end: "00:00:00.0781014"
          },
          {
            index: 284,
            count: 1,
            start: "00:00:00.0781014",
            end: "00:00:00.0783670"
          },
          {
            index: 285,
            count: 1,
            start: "00:00:00.0783670",
            end: "00:00:00.0786327"
          },
          {
            index: 286,
            count: 1,
            start: "00:00:00.0786327",
            end: "00:00:00.0788983"
          },
          {
            index: 287,
            count: 1,
            start: "00:00:00.0788983",
            end: "00:00:00.0791640"
          },
          {
            index: 288,
            count: 1,
            start: "00:00:00.0791640",
            end: "00:00:00.0794296"
          },
          {
            index: 299,
            count: 1,
            start: "00:00:00.0820861",
            end: "00:00:00.0823518"
          },
          {
            index: 300,
            count: 1,
            start: "00:00:00.0823518",
            end: "00:00:00.0826175"
          },
          {
            index: 301,
            count: 1,
            start: "00:00:00.0826175",
            end: "00:00:00.0828831"
          },
          {
            index: 302,
            count: 1,
            start: "00:00:00.0828831",
            end: "00:00:00.0831488"
          },
          {
            index: 303,
            count: 1,
            start: "00:00:00.0831488",
            end: "00:00:00.0834144"
          },
          {
            index: 304,
            count: 1,
            start: "00:00:00.0834144",
            end: "00:00:00.0836801"
          },
          {
            index: 305,
            count: 1,
            start: "00:00:00.0836801",
            end: "00:00:00.0839457"
          },
          {
            index: 306,
            count: 1,
            start: "00:00:00.0839457",
            end: "00:00:00.0842114"
          },
          {
            index: 307,
            count: 1,
            start: "00:00:00.0842114",
            end: "00:00:00.0844770"
          },
          {
            index: 308,
            count: 1,
            start: "00:00:00.0844770",
            end: "00:00:00.0847427"
          },
          {
            index: 309,
            count: 1,
            start: "00:00:00.0847427",
            end: "00:00:00.0850083"
          },
          {
            index: 310,
            count: 1,
            start: "00:00:00.0850083",
            end: "00:00:00.0852740"
          },
          {
            index: 311,
            count: 1,
            start: "00:00:00.0852740",
            end: "00:00:00.0855396"
          },
          {
            index: 312,
            count: 1,
            start: "00:00:00.0855396",
            end: "00:00:00.0858053"
          },
          {
            index: 313,
            count: 1,
            start: "00:00:00.0858053",
            end: "00:00:00.0860709"
          },
          {
            index: 314,
            count: 1,
            start: "00:00:00.0860709",
            end: "00:00:00.0863366"
          },
          {
            index: 315,
            count: 1,
            start: "00:00:00.0863366",
            end: "00:00:00.0866022"
          },
          {
            index: 316,
            count: 1,
            start: "00:00:00.0866022",
            end: "00:00:00.0868679"
          },
          {
            index: 330,
            count: 1,
            start: "00:00:00.0903213",
            end: "00:00:00.0905870"
          },
          {
            index: 331,
            count: 1,
            start: "00:00:00.0905870",
            end: "00:00:00.0908526"
          },
          {
            index: 332,
            count: 1,
            start: "00:00:00.0908526",
            end: "00:00:00.0911183"
          },
          {
            index: 333,
            count: 1,
            start: "00:00:00.0911183",
            end: "00:00:00.0913839"
          },
          {
            index: 334,
            count: 1,
            start: "00:00:00.0913839",
            end: "00:00:00.0916496"
          },
          {
            index: 335,
            count: 1,
            start: "00:00:00.0916496",
            end: "00:00:00.0919152"
          },
          {
            index: 336,
            count: 1,
            start: "00:00:00.0919152",
            end: "00:00:00.0921809"
          },
          {
            index: 337,
            count: 1,
            start: "00:00:00.0921809",
            end: "00:00:00.0924465"
          },
          {
            index: 338,
            count: 1,
            start: "00:00:00.0924465",
            end: "00:00:00.0927122"
          },
          {
            index: 339,
            count: 1,
            start: "00:00:00.0927122",
            end: "00:00:00.0929778"
          },
          {
            index: 340,
            count: 1,
            start: "00:00:00.0929778",
            end: "00:00:00.0932435"
          },
          {
            index: 341,
            count: 1,
            start: "00:00:00.0932435",
            end: "00:00:00.0935091"
          },
          {
            index: 342,
            count: 1,
            start: "00:00:00.0935091",
            end: "00:00:00.0937748"
          },
          {
            index: 343,
            count: 1,
            start: "00:00:00.0937748",
            end: "00:00:00.0940405"
          },
          {
            index: 344,
            count: 1,
            start: "00:00:00.0940405",
            end: "00:00:00.0943061"
          },
          {
            index: 345,
            count: 1,
            start: "00:00:00.0943061",
            end: "00:00:00.0945718"
          },
          {
            index: 346,
            count: 1,
            start: "00:00:00.0945718",
            end: "00:00:00.0948374"
          },
          {
            index: 347,
            count: 1,
            start: "00:00:00.0948374",
            end: "00:00:00.0951031"
          },
          {
            index: 364,
            count: 1,
            start: "00:00:00.0993535",
            end: "00:00:00.0996191"
          },
          {
            index: 365,
            count: 1,
            start: "00:00:00.0996191",
            end: "00:00:00.0998848"
          },
          {
            index: 366,
            count: 1,
            start: "00:00:00.0998848",
            end: "00:00:00.1001504"
          },
          {
            index: 367,
            count: 1,
            start: "00:00:00.1001504",
            end: "00:00:00.1004161"
          },
          {
            index: 368,
            count: 1,
            start: "00:00:00.1004161",
            end: "00:00:00.1006817"
          },
          {
            index: 369,
            count: 1,
            start: "00:00:00.1006817",
            end: "00:00:00.1009474"
          },
          {
            index: 370,
            count: 1,
            start: "00:00:00.1009474",
            end: "00:00:00.1012130"
          },
          {
            index: 371,
            count: 1,
            start: "00:00:00.1012130",
            end: "00:00:00.1014787"
          },
          {
            index: 372,
            count: 1,
            start: "00:00:00.1014787",
            end: "00:00:00.1017443"
          },
          {
            index: 373,
            count: 1,
            start: "00:00:00.1017443",
            end: "00:00:00.1020100"
          },
          {
            index: 374,
            count: 1,
            start: "00:00:00.1020100",
            end: "00:00:00.1022756"
          },
          {
            index: 375,
            count: 1,
            start: "00:00:00.1022756",
            end: "00:00:00.1025413"
          },
          {
            index: 376,
            count: 1,
            start: "00:00:00.1025413",
            end: "00:00:00.1028069"
          },
          {
            index: 377,
            count: 1,
            start: "00:00:00.1028069",
            end: "00:00:00.1030726"
          },
          {
            index: 378,
            count: 1,
            start: "00:00:00.1030726",
            end: "00:00:00.1033382"
          },
          {
            index: 379,
            count: 1,
            start: "00:00:00.1033382",
            end: "00:00:00.1036039"
          },
          {
            index: 380,
            count: 1,
            start: "00:00:00.1036039",
            end: "00:00:00.1038695"
          },
          {
            index: 381,
            count: 1,
            start: "00:00:00.1038695",
            end: "00:00:00.1041352"
          },
          {
            index: 382,
            count: 1,
            start: "00:00:00.1041352",
            end: "00:00:00.1044008"
          },
          {
            index: 383,
            count: 1,
            start: "00:00:00.1044008",
            end: "00:00:00.1046665"
          },
          {
            index: 384,
            count: 1,
            start: "00:00:00.1046665",
            end: "00:00:00.1049321"
          },
          {
            index: 385,
            count: 1,
            start: "00:00:00.1049321",
            end: "00:00:00.1051978"
          },
          {
            index: 386,
            count: 1,
            start: "00:00:00.1051978",
            end: "00:00:00.1054634"
          },
          {
            index: 387,
            count: 1,
            start: "00:00:00.1054634",
            end: "00:00:00.1057291"
          },
          {
            index: 388,
            count: 1,
            start: "00:00:00.1057291",
            end: "00:00:00.1059948"
          },
          {
            index: 401,
            count: 1,
            start: "00:00:00.1091826",
            end: "00:00:00.1094482"
          },
          {
            index: 402,
            count: 1,
            start: "00:00:00.1094482",
            end: "00:00:00.1097139"
          },
          {
            index: 403,
            count: 1,
            start: "00:00:00.1097139",
            end: "00:00:00.1099795"
          },
          {
            index: 404,
            count: 1,
            start: "00:00:00.1099795",
            end: "00:00:00.1102452"
          },
          {
            index: 405,
            count: 1,
            start: "00:00:00.1102452",
            end: "00:00:00.1105108"
          },
          {
            index: 406,
            count: 1,
            start: "00:00:00.1105108",
            end: "00:00:00.1107765"
          },
          {
            index: 407,
            count: 1,
            start: "00:00:00.1107765",
            end: "00:00:00.1110421"
          },
          {
            index: 408,
            count: 1,
            start: "00:00:00.1110421",
            end: "00:00:00.1113078"
          },
          {
            index: 409,
            count: 1,
            start: "00:00:00.1113078",
            end: "00:00:00.1115734"
          },
          {
            index: 410,
            count: 1,
            start: "00:00:00.1115734",
            end: "00:00:00.1118391"
          },
          {
            index: 411,
            count: 1,
            start: "00:00:00.1118391",
            end: "00:00:00.1121047"
          },
          {
            index: 412,
            count: 1,
            start: "00:00:00.1121047",
            end: "00:00:00.1123704"
          },
          {
            index: 413,
            count: 1,
            start: "00:00:00.1123704",
            end: "00:00:00.1126360"
          },
          {
            index: 414,
            count: 1,
            start: "00:00:00.1126360",
            end: "00:00:00.1129017"
          },
          {
            index: 415,
            count: 1,
            start: "00:00:00.1129017",
            end: "00:00:00.1131673"
          },
          {
            index: 416,
            count: 1,
            start: "00:00:00.1131673",
            end: "00:00:00.1134330"
          }
        ],
        quantiles: [
          {
            timestamp: "00:00:00.0354644",
            quantileValue: 0.5
          },
          {
            timestamp: "00:00:00.1034710",
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
      isAsync: false,
      histogramData: {
        bars: [
          {
            index: 0,
            count: 5,
            start: "00:00:00.0100000",
            end: "00:00:00.0110000"
          },
          {
            index: 1,
            count: 7,
            start: "00:00:00.0110000",
            end: "00:00:00.0120000"
          },
          {
            index: 2,
            count: 6,
            start: "00:00:00.0120000",
            end: "00:00:00.0130000"
          },
          {
            index: 3,
            count: 4,
            start: "00:00:00.0130000",
            end: "00:00:00.0140000"
          },
          {
            index: 4,
            count: 3,
            start: "00:00:00.0140000",
            end: "00:00:00.0150000"
          },
          {
            index: 5,
            count: 1,
            start: "00:00:00.0150000",
            end: "00:00:00.0160000"
          },
          {
            index: 7,
            count: 1,
            start: "00:00:00.0170000",
            end: "00:00:00.0170000"
          },
          {
            index: 10,
            count: 2,
            start: "00:00:00.0200000",
            end: "00:00:00.0210000"
          },
          {
            index: 20,
            count: 1,
            start: "00:00:00.0300000",
            end: "00:00:00.0310000"
          }
        ],
        quantiles: [
          {
            timestamp: "00:00:00.0125000",
            quantileValue: 0.5
          },
          {
            timestamp: "00:00:00.0205000",
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
      isAsync: false,
      histogramData: {
        bars: [
          {
            index: 0,
            count: 5,
            start: "00:00:00.0010000",
            end: "00:00:00.0020000"
          },
          {
            index: 1,
            count: 7,
            start: "00:00:00.0020000",
            end: "00:00:00.0030000"
          },
          {
            index: 3,
            count: 6,
            start: "00:00:00.0050000",
            end: "00:00:00.0060000"
          }
        ],
        quantiles: []
      }
    }
  }
};
