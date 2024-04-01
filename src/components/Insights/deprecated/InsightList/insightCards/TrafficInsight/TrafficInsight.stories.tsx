import { Meta, StoryObj } from "@storybook/react";
import { TrafficInsight } from ".";
import { InsightType } from "../../../../../../types";
import { InsightCategory, InsightScope } from "../../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TrafficInsight> = {
  title: "Insights/deprecated/InsightList/insightCards/TrafficInsight",
  component: TrafficInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LowTraffic: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
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
      name: "Low Usage",
      type: InsightType.LowUsage,
      category: InsightCategory.Usage,
      isDismissed: false,
      isDismissible: true,
      specifity: 4,
      importance: 6,
      decorators: [
        {
          title: "Low Usage",
          description: "Low level of usage for this endpoint"
        }
      ],
      maxCallsIn1Min: 4,
      scope: InsightScope.EntrySpan,
      endpointSpan: "HTTP GET /owners/new",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/new",
      route: "epHTTP:HTTP GET /owners/new",
      serviceName: "PetClinic",
      spanInfo: {
        name: "HTTP GET /owners/new",
        displayName: "HTTP GET /owners/new",
        instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
        spanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/new",
        methodCodeObjectId:
          "method:org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm",
        kind: "Server",
        codeObjectId:
          "org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm"
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId:
        "org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm",
      environment: "SAMPLE_ENV",
      severity: 0,
      isRecalculateEnabled: false,
      prefixedCodeObjectId:
        "method:org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm",
      customStartTime: null,
      actualStartTime: "2023-06-16T10:30:22.776Z"
    }
  }
};

export const HighTraffic: Story = {
  args: {
    insight: {
      sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
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
      type: InsightType.HighUsage,
      category: InsightCategory.Usage,
      isDismissed: false,
      isDismissible: true,
      specifity: 4,
      importance: 5,
      decorators: [
        {
          title: "High Usage",
          description: "High level of usage for this endpoint"
        }
      ],
      maxCallsIn1Min: 433,
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
      actualStartTime: "2023-06-16T11:10:22.773Z"
    }
  }
};
