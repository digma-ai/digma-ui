import { Meta, StoryObj } from "@storybook/react";

import { AssetList } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetList> = {
  title: "Assets/AssetList",
  component: AssetList,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    assetTypeId: "Endpoint",
    data: {
      data: [
        {
          service: "PetClinic",
          displayName: "HTTP GET /owners/new",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/new",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:05.821874Z",
          p50: {
            value: 2.03,
            unit: "sec",
            raw: 2029855700.0
          },
          p95: {
            value: 2.42,
            unit: "sec",
            raw: 2423157300.0
          },
          insights: [
            {
              type: "SlowestSpans",
              importance: 2
            },
            {
              type: "SlowEndpoint",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.3521035689991816,
            ScoreExp1000: 0.3386358571779296
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /owners/{ownerId}",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:48.612988Z",
          p50: {
            value: 22.71,
            unit: "ms",
            raw: 22705900.0
          },
          p95: {
            value: 99.36,
            unit: "ms",
            raw: 99365000.0
          },
          insights: [
            {
              type: "HotSpot",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "HighUsage",
              importance: 5
            },
            {
              type: "Errors",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /oups",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /oups",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:47.16926Z",
          p50: {
            value: 3.89,
            unit: "ms",
            raw: 3889300.0
          },
          p95: {
            value: 4.21,
            unit: "ms",
            raw: 4207600.0
          },
          insights: [
            {
              type: "HotSpot",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "Errors",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/ErrorHotspot",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorHotspot",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:14.968188Z",
          p50: {
            value: 50.99,
            unit: "ms",
            raw: 50989900.0
          },
          p95: {
            value: 55.16,
            unit: "ms",
            raw: 55161800.0
          },
          insights: [
            {
              type: "HotSpot",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "Errors",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:19.219654Z",
          p50: {
            value: 1.36,
            unit: "ms",
            raw: 1363200.0
          },
          p95: {
            value: 1.47,
            unit: "ms",
            raw: 1474700.0
          },
          insights: [
            {
              type: "HotSpot",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "Errors",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /owners/{ownerId}/pets/new",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}/pets/new",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:08.728395Z",
          p50: {
            value: 94.44,
            unit: "ms",
            raw: 94437800.0
          },
          p95: {
            value: 128.43,
            unit: "ms",
            raw: 128429300.0
          },
          insights: [
            {
              type: "SlowestSpans",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.8314664295667409,
            ScoreExp1000: 0.8645342516094802
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/SpanBottleneck",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/SpanBottleneck",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:14.363144Z",
          p50: {
            value: 283.5,
            unit: "ms",
            raw: 283500100.0
          },
          p95: {
            value: 306.7,
            unit: "ms",
            raw: 306695500.0
          },
          insights: [
            {
              type: "SlowestSpans",
              importance: 2
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/NPlusOneWithInternalSpan",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithInternalSpan",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:15.093935Z",
          p50: {
            value: 31.66,
            unit: "ms",
            raw: 31660700.0
          },
          p95: {
            value: 34.25,
            unit: "ms",
            raw: 34251100.0
          },
          insights: [
            {
              type: "EndpointSpaNPlusOne",
              importance: 3
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:15.130839Z",
          p50: {
            value: 26.17,
            unit: "ms",
            raw: 26165900.0
          },
          p95: {
            value: 28.31,
            unit: "ms",
            raw: 28306700.0
          },
          insights: [
            {
              type: "EndpointSpaNPlusOne",
              importance: 3
            },
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:19.224037Z",
          p50: {
            value: 1.65,
            unit: "ms",
            raw: 1649400.0
          },
          p95: {
            value: 1.78,
            unit: "ms",
            raw: 1784400.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "Errors",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName:
            "HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:19.212544Z",
          p50: {
            value: 1.65,
            unit: "ms",
            raw: 1649400.0
          },
          p95: {
            value: 1.78,
            unit: "ms",
            raw: 1784400.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "Errors",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /",
          spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:47.675037Z",
          p50: {
            value: 4.94,
            unit: "ms",
            raw: 4941400.0
          },
          p95: {
            value: 16.84,
            unit: "ms",
            raw: 16837700.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.7208595047530149,
            ScoreExp1000: 0.6627975469849793
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /**",
          spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /**",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:47.662761Z",
          p50: {
            value: 9.86,
            unit: "ms",
            raw: 9858800.0
          },
          p95: {
            value: 18.93,
            unit: "ms",
            raw: 18927700.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /owners",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:48.798657Z",
          p50: {
            value: 8.34,
            unit: "ms",
            raw: 8337200.0
          },
          p95: {
            value: 13.67,
            unit: "ms",
            raw: 13671300.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /owners/{ownerId}/edit",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/{ownerId}/edit",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:08.60984Z",
          p50: {
            value: 30.09,
            unit: "ms",
            raw: 30090800.0
          },
          p95: {
            value: 106.14,
            unit: "ms",
            raw: 106139900.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 1.0,
            ScoreExp1000: 1.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /owners/find",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/find",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:47.759516Z",
          p50: {
            value: 3.7,
            unit: "ms",
            raw: 3696500.0
          },
          p95: {
            value: 18.93,
            unit: "ms",
            raw: 18927700.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/HighUsage",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/HighUsage",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:19.187797Z",
          p50: {
            value: 7.11,
            unit: "ms",
            raw: 7112000.0
          },
          p95: {
            value: 16.52,
            unit: "ms",
            raw: 16517700.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/req-map-get",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/req-map-get",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:19.198821Z",
          p50: {
            value: 2.2,
            unit: "ms",
            raw: 2195400.0
          },
          p95: {
            value: 2.38,
            unit: "ms",
            raw: 2375000.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /SampleInsights/SlowEndpoint",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/SlowEndpoint",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:25:11.491062Z",
          p50: {
            value: 2.42,
            unit: "sec",
            raw: 2423157300.0
          },
          p95: {
            value: 2.53,
            unit: "sec",
            raw: 2527006900.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "LowUsage",
              importance: 6
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        },
        {
          service: "PetClinic",
          displayName: "HTTP GET /vets.html",
          spanCodeObjectId:
            "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /vets.html",
          assetType: "Endpoint",
          latestSpanTimestamp: "2023-10-23T15:24:46.980123Z",
          p50: {
            value: 10.55,
            unit: "ms",
            raw: 10546600.0
          },
          p95: {
            value: 25.41,
            unit: "ms",
            raw: 25409000.0
          },
          insights: [
            {
              type: "SpanScalingInsufficientData",
              importance: 5
            },
            {
              type: "EndpointBreakdown",
              importance: 6
            },
            {
              type: "LowUsage",
              importance: 6
            }
          ],
          impactScores: {
            ScoreExp25: 0.0,
            ScoreExp1000: 0.0
          }
        }
      ],
      totalCount: 20,
      filteredCount: 20
    }
  }
};
