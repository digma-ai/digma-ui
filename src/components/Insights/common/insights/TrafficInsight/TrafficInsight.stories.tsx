import { Meta, StoryObj } from "@storybook/react";
import { TrafficInsight } from ".";
import {
  InsightCategory,
  InsightImportance,
  InsightScope,
  InsightSpecificity,
  InsightType
} from "../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TrafficInsight> = {
  title: "Insights/common/insights/TrafficInsight",
  component: TrafficInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const BaseTrafficInsight = {
  id: "60b55792-8262-3c5d-9628-7cce7979ad6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "High Usage",
  scope: InsightScope.EntrySpan,
  endpointSpan: "HTTP GET SampleInsights/lock/{milisec}",
  spanCodeObjectId:
    "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
  route: "epHTTP:HTTP GET SampleInsights/lock/{milisec}",
  serviceName: "Sample.MoneyTransfer.API",
  spanInfo: {
    name: "HTTP GET SampleInsights/lock/{milisec}",
    displayName: "HTTP GET SampleInsights/lock/{milisec}",
    instrumentationLibrary: "OpenTelemetry.Instrumentation.AspNetCore",
    spanCodeObjectId:
      "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP GET SampleInsights/lock/{milisec}",
    methodCodeObjectId:
      "method:Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
    kind: "Server",
    codeObjectId:
      "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)"
  },
  shortDisplayInfo: {
    title: "",
    targetDisplayName: "",
    subtitle: "",
    description: ""
  },
  codeObjectId:
    "Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
  environment: "BOB-LAPTOP[LOCAL]",
  severity: 0,
  isRecalculateEnabled: false,
  prefixedCodeObjectId:
    "method:Sample.MoneyTransfer.API.Controllers.SampleInsightsController$_$Lock(Double)",
  customStartTime: null,
  actualStartTime: "2023-06-16T11:10:22.773Z",
  decorators: null,
  category: "",
  importance: InsightImportance.NotInteresting
};

export const NormalTraffic: Story = {
  args: {
    insight: {
      ...BaseTrafficInsight,
      decorators: [
        {
          title: "Normal Usage",
          description: "Normal level of usage for this endpoint"
        }
      ],
      category: InsightCategory.Usage,
      type: InsightType.NormalUsage,
      importance: InsightImportance.NotInteresting,
      name: "Normal Usage",
      maxCallsIn1Min: 0,
      specifity: InsightSpecificity.OwnInsight
    }
  }
};

export const LowTraffic: Story = {
  args: {
    insight: {
      ...BaseTrafficInsight,
      decorators: [
        {
          title: "Low Usage",
          description: "Low level of usage for this endpoint"
        }
      ],
      category: InsightCategory.Usage,
      type: InsightType.LowUsage,
      importance: InsightImportance.Info,
      name: "Low Usage",
      maxCallsIn1Min: 0,
      specifity: InsightSpecificity.OwnInsight
    }
  }
};

export const HighTraffic: Story = {
  args: {
    insight: {
      ...BaseTrafficInsight,
      decorators: [
        {
          title: "High Usage",
          description: "High level of usage for this endpoint"
        }
      ],
      category: InsightCategory.Usage,
      type: InsightType.HighUsage,
      importance: InsightImportance.Interesting,
      name: "High Usage",
      maxCallsIn1Min: 0,
      specifity: InsightSpecificity.OwnInsight
    }
  }
};
