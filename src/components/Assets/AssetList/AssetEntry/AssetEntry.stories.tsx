import type { Meta, StoryObj } from "@storybook/react";
import { AssetEntry } from ".";
import { AssetType } from "../../../../redux/services/types";
import { InsightType } from "../../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AssetEntry> = {
  title: "Assets/AssetList/AssetEntry",
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
      services: ["service1", "service2"],
      displayName: "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan",
      assetType: AssetType.Endpoint,
      service: "PetClinicWithAgent",
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
      impactScore: 0.08999,
      impactScores: {
        ScoreExp25: 0.08999,
        ScoreExp1000: 0.08999
      },
      insights: [
        {
          type: InsightType.Errors,
          importance: 5,
          criticality: 0.9
        },
        {
          type: InsightType.HotSpot,
          importance: 2,
          criticality: 0.5
        },
        {
          type: InsightType.LowUsage,
          importance: 6,
          criticality: 0.1
        }
      ],
      latestSpanTimestamp: "2023-02-20T14:36:03.480951Z",
      instrumentationLibrary: "Very long long long long long long name"
    }
  }
};
