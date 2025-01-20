import type { Meta, StoryObj } from "@storybook/react";
import { SpanQueryOptimizationInsightCard } from ".";
import { mockedSpanQueryOptimizationInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanQueryOptimizationInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanQueryOptimizationInsightCard",
  component: SpanQueryOptimizationInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedSpanQueryOptimizationInsight
  }
};

export const ManyEndpoints: Story = {
  args: {
    insight: {
      ...mockedSpanQueryOptimizationInsight,
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
      ...mockedSpanQueryOptimizationInsight,
      ticketLink: "https://digma.ai/1"
    }
  }
};
