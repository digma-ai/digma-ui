import { Meta, StoryObj } from "@storybook/react";
import { RequestBreakdownInsight } from ".";
import { InsightType } from "../../../types";
import { ComponentType, InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RequestBreakdownInsight> = {
  title: "Insights/RequestBreakdownInsight",
  component: RequestBreakdownInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: {
      name: "Request Breakdown",
      type: InsightType.EndpointBreakdown,
      category: InsightCategory.Usage,
      specifity: 4,
      importance: 6,
      isRecalculateEnabled: true,
      components: [
        {
          type: ComponentType.Internal,
          fraction: 0.996539483729232
        },
        {
          type: ComponentType.Rendering,
          fraction: 0.0034605162707679665
        }
      ],
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
        title: "Request Breakdown",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId:
        "org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm",
      decorators: null,
      environment: "SAMPLE_ENV",
      severity: 0,
      prefixedCodeObjectId:
        "method:org.springframework.samples.petclinic.owner.OwnerController$_$initCreationForm",
      customStartTime: null,
      actualStartTime: "2023-06-30T00:00:00.000Z"
    }
  }
};
