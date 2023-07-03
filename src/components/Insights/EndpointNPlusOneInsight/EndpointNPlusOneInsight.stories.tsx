import { Meta, StoryObj } from "@storybook/react";
import { EndpointNPlusOneInsight } from ".";
import { InsightType } from "../../../types";
import { InsightCategory, InsightScope } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointNPlusOneInsight> = {
  title: "Insights/EndpointNPlusOneInsight",
  component: EndpointNPlusOneInsight,
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
      name: "Suspected N+1 Query",
      type: InsightType.EndpointSpanNPlusOne,
      category: InsightCategory.Performance,
      specifity: 2,
      importance: 3,
      spans: [
        {
          occurrences: 200,
          internalSpan: null,
          clientSpan: {
            name: "1D138649EB4FFA92C0E3C8103404F2",
            displayName: "select * from users where id = :id",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F2",
            methodCodeObjectId: null,
            kind: "Client",
            codeObjectId: null
          },
          traceId: "9C510BC1E1CD59DD7E820BC3E8DFD4C4",
          duration: {
            value: 70.08,
            unit: "μs",
            raw: 70081
          },
          fraction: 0.08985711281727758
        }
      ],
      scope: InsightScope.EntrySpan,
      endpointSpan: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
      spanCodeObjectId:
        "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
      route: "epHTTP:HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
      serviceName: "PetClinic",
      spanInfo: {
        name: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        displayName: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
        spanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        methodCodeObjectId:
          "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
        kind: "Server",
        codeObjectId:
          "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan"
      },
      shortDisplayInfo: {
        title: "",
        targetDisplayName: "",
        subtitle: "",
        description: ""
      },
      codeObjectId:
        "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
      decorators: [
        {
          title: "N+1 Suspected",
          description: "Supected NPlus One"
        }
      ],
      environment: "SAMPLE_ENV",
      severity: 0,
      isRecalculateEnabled: false,
      prefixedCodeObjectId:
        "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
      customStartTime: null,
      actualStartTime: "2023-06-16T10:30:33.027Z"
    }
  }
};
