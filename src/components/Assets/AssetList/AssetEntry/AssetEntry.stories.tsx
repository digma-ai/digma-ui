import { Meta, StoryObj } from "@storybook/react";

import { AssetEntry } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetEntry> = {
  title: "Assets/AssetEntry",
  component: AssetEntry,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entry: {
      id: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
      relatedServices: ["service1", "service2"],
      span: {
        classification: "Endpoint",
        role: "Entry",
        name: "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
        displayName: "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
        instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
        spanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
        methodCodeObjectId:
          "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnLocalRootSpan",
        kind: "Server",
        codeObjectId:
          "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genErrorRecordedOnLocalRootSpan"
      },
      assetType: "Endpoint",
      serviceName: "PetClinicWithAgent",
      endpointCodeObjectId:
        "endpoint:epHTTP:HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
      p50: {
        value: 804.65,
        unit: "μs",
        raw: 804649.5
      },
      p95: {
        value: 62.47,
        unit: "ms",
        raw: 62466300.59999996
      },
      durationPercentiles: [
        {
          percentile: 0.5,
          currentDuration: {
            value: 804.65,
            unit: "μs",
            raw: 804649.5
          }
        },
        {
          percentile: 0.95,
          currentDuration: {
            value: 62.47,
            unit: "ms",
            raw: 62466300.59999996
          }
        }
      ],
      impactScores: {
        ScoreExp25: 0,
        ScoreExp1000: 0
      },
      insights: [
        {
          type: "Errors",
          importance: 5,
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          }
        },
        {
          type: "HotSpot",
          importance: 2,
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          }
        },
        {
          type: "LowUsage",
          importance: 6,
          shortDisplayInfo: {
            title: "",
            targetDisplayName: "",
            subtitle: "",
            description: ""
          }
        }
      ],
      lastSpanInstanceInfo: {
        traceId: "3142058FA4A9494F082AE685002B0EA7",
        spanId: "833B31BB84D62E80",
        startTime: "2023-02-20T14:36:03.480951Z",
        duration: {
          value: 1.28,
          unit: "ms",
          raw: 1285000
        }
      },
      firstDataSeenTime: "2023-01-23T09:20:43.102392Z"
    }
  }
};
