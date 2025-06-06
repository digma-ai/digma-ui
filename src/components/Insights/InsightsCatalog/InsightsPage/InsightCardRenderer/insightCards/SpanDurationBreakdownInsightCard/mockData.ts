import { InsightType } from "../../../../../../../types";
import type { SpanDurationBreakdownInsight } from "../../../../../types";
import { InsightCategory, InsightScope } from "../../../../../types";

export const mockedSpanDurationBreakdownInsight: SpanDurationBreakdownInsight =
  {
    sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
    id: "60b55792-8262-4c5d-9628-7cce7979ac6d",
    firstDetected: "2023-12-05T17:25:47.010Z",
    lastDetected: "2024-01-05T13:14:47.010Z",
    criticality: 0,
    firstCommitId: "b3f7b3f",
    lastCommitId: "a1b2c3d",
    deactivatedCommitId: null,
    reopenCount: 0,
    ticketLink: null,
    impact: 0,
    name: "Span Duration Breakdown",
    type: InsightType.SpanDurationBreakdown,
    category: InsightCategory.Performance,
    specifity: 4,
    isRecalculateEnabled: true,
    isDismissed: false,
    isDismissible: true,
    importance: 6,
    breakdownEntries: [
      {
        spanName: "GET PetClinic /SampleInsights/ErrorHotspot",
        spanDisplayName: "GET PetClinic /SampleInsights/ErrorHotspot",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorHotspot",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 9.31,
              unit: "ms",
              raw: 9310166
            },
            occurrence: 1
          },
          {
            percentile: 0.95,
            duration: {
              value: 9.31,
              unit: "ms",
              raw: 9310166
            },
            occurrence: 2
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/ErrorRecordedOnCurrentSpan",
        spanDisplayName:
          "GET PetClinic /SampleInsights/ErrorRecordedOnCurrentSpan",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorRecordedOnCurrentSpan",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 1.85,
              unit: "ms",
              raw: 1853959
            },
            occurrence: 2
          },
          {
            percentile: 0.95,
            duration: {
              value: 1.85,
              unit: "ms",
              raw: 1853959
            },
            occurrence: 3
          }
        ],
        codeObjectId: null
      },
      {
        spanName:
          "GET PetClinic /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
        spanDisplayName:
          "GET PetClinic /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 2.98,
              unit: "ms",
              raw: 2977875
            },
            occurrence: 5
          },
          {
            percentile: 0.95,
            duration: {
              value: 2.98,
              unit: "ms",
              raw: 2977875
            },
            occurrence: 3
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/ErrorRecordedOnLocalRootSpan",
        spanDisplayName:
          "GET PetClinic /SampleInsights/ErrorRecordedOnLocalRootSpan",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/ErrorRecordedOnLocalRootSpan",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 18.64,
              unit: "ms",
              raw: 18642667
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 18.64,
              unit: "ms",
              raw: 18642667
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/HighUsage",
        spanDisplayName: "GET PetClinic /SampleInsights/HighUsage",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/HighUsage",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 1.28,
              unit: "sec",
              raw: 1276017342
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 1.88,
              unit: "sec",
              raw: 1883717142
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/NPlusOneWithInternalSpan",
        spanDisplayName:
          "GET PetClinic /SampleInsights/NPlusOneWithInternalSpan",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/NPlusOneWithInternalSpan",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 8.62,
              unit: "ms",
              raw: 8622375
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 8.62,
              unit: "ms",
              raw: 8622375
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/NPlusOneWithoutInternalSpan",
        spanDisplayName:
          "GET PetClinic /SampleInsights/NPlusOneWithoutInternalSpan",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/NPlusOneWithoutInternalSpan",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 2.95,
              unit: "ms",
              raw: 2951917
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 2.95,
              unit: "ms",
              raw: 2951917
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/SlowEndpoint",
        spanDisplayName: "GET PetClinic /SampleInsights/SlowEndpoint",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/SlowEndpoint",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 5.01,
              unit: "sec",
              raw: 5011033127
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 5.01,
              unit: "sec",
              raw: 5011033127
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/SpanBottleneck",
        spanDisplayName: "GET PetClinic /SampleInsights/SpanBottleneck",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/SpanBottleneck",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 520.92,
              unit: "ms",
              raw: 520920000
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 520.92,
              unit: "ms",
              raw: 520920000
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "GET PetClinic /SampleInsights/req-map-get",
        spanDisplayName: "GET PetClinic /SampleInsights/req-map-get",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/req-map-get",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 1.56,
              unit: "ms",
              raw: 1556959
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 1.56,
              unit: "ms",
              raw: 1556959
            }
          }
        ],
        codeObjectId: null
      },
      {
        spanName: "HTTP GET  ClientTester.generateInsightData",
        spanDisplayName: "HTTP GET  ClientTester.generateInsightData",
        spanInstrumentationLibrary: "io.opentelemetry.okhttp-3.0",
        spanCodeObjectId:
          "span:io.opentelemetry.okhttp-3.0$_$HTTP GET  ClientTester.generateInsightData",
        percentiles: [
          {
            percentile: 0.5,
            duration: {
              value: 693.35,
              unit: "ms",
              raw: 693349003
            }
          },
          {
            percentile: 0.95,
            duration: {
              value: 693.35,
              unit: "ms",
              raw: 693349003
            }
          }
        ],
        codeObjectId: null
      }
    ],
    scope: InsightScope.Span,
    spanInfo: {
      name: "ClientTester.generateInsightData",
      displayName: "ClientTester.generateInsightData",
      instrumentationLibrary:
        "io.opentelemetry.opentelemetry-instrumentation-annotations-1.16",
      spanCodeObjectId:
        "span:io.opentelemetry.opentelemetry-instrumentation-annotations-1.16$_$ClientTester.generateInsightData",
      methodCodeObjectId:
        "method:petclinic.client.ClientTester$_$generateInsightData",
      kind: "Internal"
    },
    shortDisplayInfo: {
      title: "",
      targetDisplayName: "",
      subtitle: "",
      description: ""
    },
    codeObjectId: "petclinic.client.ClientTester$_$generateInsightData",
    decorators: null,
    environment: "SAMPLE_ENV",
    severity: 0,
    customStartTime: null,
    actualStartTime: "2023-06-16T10:30:31.848Z"
  };
