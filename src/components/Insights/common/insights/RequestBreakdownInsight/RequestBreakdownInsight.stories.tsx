import { Meta, StoryObj } from "@storybook/react";
import { RequestBreakdownInsight } from ".";
import {
  ComponentType,
  EndpointBreakdownInsight,
  InsightCategory,
  InsightScope,
  InsightType
} from "../../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RequestBreakdownInsight> = {
  title: "Insights/common/insights/RequestBreakdownInsight",
  component: RequestBreakdownInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const data: EndpointBreakdownInsight = {
  sourceSpanCodeObjectInsight: "sourceSpanCodeObjectInsightId",
  id: "60b55792-8262-4c5d-9628-7cce7979dd6d",
  firstDetected: "2023-12-05T17:25:47.010Z",
  lastDetected: "2024-01-05T13:14:47.010Z",
  criticality: 0,
  firstCommitId: "b3f7b3f",
  lastCommitId: "a1b2c3d",
  deactivatedCommitId: null,
  reopenCount: 0,
  ticketLink: null,
  impact: 0,
  name: "Request Breakdown",
  type: InsightType.EndpointBreakdown,
  category: InsightCategory.Usage,
  specifity: 4,
  importance: 6,
  isRecalculateEnabled: true,
  hasAsyncSpans: false,
  isDismissed: false,
  isDismissible: true,
  components: [
    {
      type: ComponentType.Internal,
      fraction: 0.396539483729232,
      duration: null
    },
    {
      type: ComponentType.Rendering,
      fraction: 0.396539483729232,
      duration: null
    },
    {
      type: ComponentType.HttpClients,
      fraction: 0.103460516270768,
      duration: null
    },
    {
      type: ComponentType.DbQueries,
      fraction: 0.103460516270768,
      duration: null
    }
  ],
  p50Components: [
    {
      type: ComponentType.Internal,
      fraction: 0.396539483729232,
      duration: null
    },
    {
      type: ComponentType.Rendering,
      fraction: 0.396539483729232,
      duration: null
    },
    {
      type: ComponentType.HttpClients,
      fraction: 0.103460516270768,
      duration: null
    },
    {
      type: ComponentType.DbQueries,
      fraction: 0.103460516270768,
      duration: null
    }
  ],
  p95Components: [
    {
      type: ComponentType.Internal,
      fraction: 0.103460516270768,
      duration: null
    },
    {
      type: ComponentType.Rendering,
      fraction: 0.103460516270768,
      duration: null
    },
    {
      type: ComponentType.HttpClients,
      fraction: 0.396539483729232,
      duration: null
    },
    {
      type: ComponentType.DbQueries,
      fraction: 0.396539483729232,
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
      components: [
        {
          type: ComponentType.Internal,
          fraction: 0.996539483729232,
          duration: {
            value: 2.06,
            unit: "ms",
            raw: 2063332.9999999993
          }
        },
        {
          type: ComponentType.Rendering,
          fraction: 0.0034605162707679665,
          duration: {
            value: 1.03,
            unit: "ms",
            raw: 1031666.4999999995
          }
        }
      ],
      p50Components: [
        {
          type: ComponentType.Internal,
          fraction: 0.996539483729232,
          duration: {
            value: 2.06,
            unit: "ms",
            raw: 2063332.9999999993
          }
        },
        {
          type: ComponentType.Rendering,
          fraction: 0.0034605162707679665,
          duration: {
            value: 1.03,
            unit: "ms",
            raw: 1031666.4999999995
          }
        }
      ],
      p95Components: [
        {
          type: ComponentType.Internal,
          fraction: 0.996539483729232,
          duration: {
            value: 1.06,
            unit: "ms",
            raw: 1063332.9999999993
          }
        },
        {
          type: ComponentType.Rendering,
          fraction: 0.0034605162707679665,
          duration: {
            value: 2.03,
            unit: "ms",
            raw: 2031666.4999999995
          }
        }
      ],
      hasAsyncSpans: true
    }
  }
};
