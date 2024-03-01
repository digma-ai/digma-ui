import { Meta, StoryObj } from "@storybook/react";
import { SpanQueryOptimizationInsight } from ".";
import { mockedQueryOptimizationInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanQueryOptimizationInsight> = {
  title: "Insights/common/insights/SpanQueryOptimizationInsight",
  component: SpanQueryOptimizationInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedQueryOptimizationInsight
  }
};

export const NoSpanCodeObjectId: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      spanInfo: null
    }
  }
};

export const ManyEndpoints: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      endpoints: [
        {
          endpointInfo: {
            route: "HTTP POST /owners/new1",
            instrumentationLibrary: "OwnerController",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new1",
            serviceName: "spring-petclinic"
          }
        },
        {
          endpointInfo: {
            route: "HTTP POST /owners/new2",
            instrumentationLibrary: "OwnerController",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new2",
            serviceName: "spring-petclinic"
          }
        },
        {
          endpointInfo: {
            route: "HTTP POST /owners/new3",
            instrumentationLibrary: "OwnerController",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new3",
            serviceName: "spring-petclinic"
          }
        },
        {
          endpointInfo: {
            route: "HTTP POST /owners/new4",
            instrumentationLibrary: "OwnerController",
            spanCodeObjectId:
              "span:io.opentelemetry.tomcat-10.0$_$HTTP POST /owners/new4",
            serviceName: "spring-petclinic"
          }
        }
      ]
    }
  }
};

export const LinkedJira: Story = {
  args: {
    insight: {
      ...mockedQueryOptimizationInsight,
      ticketLink: "https://digma.ai/1"
    }
  }
};
