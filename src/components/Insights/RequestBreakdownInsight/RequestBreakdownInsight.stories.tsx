import { Meta, StoryObj } from "@storybook/react";
import { RequestBreakdownInsight } from ".";
import { InsightType } from "../../../types";
import {
  ComponentType,
  EndpointBreakdownInsight,
  InsightCategory,
  InsightScope
} from "../types";

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

const data: EndpointBreakdownInsight = {
  name: "Request Breakdown",
  type: InsightType.EndpointBreakdown,
  category: InsightCategory.Usage,
  specifity: 4,
  importance: 6,
  isRecalculateEnabled: true,
  hasAsyncSpans: false,
  components: [
    {
      type: ComponentType.Internal,
      fraction: 0.996539483729232,
      duration: null
    },
    {
      type: ComponentType.Rendering,
      fraction: 0.0034605162707679665,
      duration: null
    }
  ],
  p50Components: [
    {
      type: ComponentType.Internal,
      fraction: 0.996539483729232,
      duration: null
    },
    {
      type: ComponentType.Rendering,
      fraction: 0.0034605162707679665,
      duration: null
    }
  ],
  p95Components: [
    {
      type: ComponentType.Internal,
      fraction: 0.796539483729232,
      duration: null
    },
    {
      type: ComponentType.Rendering,
      fraction: 0.20346051627,
      duration: null
    }
  ],
  scope: InsightScope.EntrySpan,
  endpointSpan: "HTTP GET /owners/new",
  spanCodeObjectId: "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /owners/new",
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
};

export const Default: Story = {
  args: {
    insight: data
  }
};

export const Async: Story = {
  args: {
    insight: {
      ...data,
      components: data.components.map((x) => ({
        ...x,
        duration: {
          value: 2.06,
          unit: "ms",
          raw: 2063332.9999999993
        }
      })),
      p50Components: data.components.map((x) => ({
        ...x,
        duration: {
          value: 2.06,
          unit: "ms",
          raw: 2063332.9999999993
        }
      })),
      p95Components: data.components.map((x) => ({
        ...x,
        duration: {
          value: 2.06,
          unit: "ms",
          raw: 2063332.9999999993
        }
      })),
      hasAsyncSpans: true
    }
  }
};
