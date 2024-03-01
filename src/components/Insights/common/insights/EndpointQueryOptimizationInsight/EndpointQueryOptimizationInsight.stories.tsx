import { Meta, StoryObj } from "@storybook/react";
import { EndpointQueryOptimizationInsight } from ".";
import { mockedEndpointQueryOptimizationInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationInsight> = {
  title: "Insights/common/insights/EndpointQueryOptimizationInsight",
  component: EndpointQueryOptimizationInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insight: mockedEndpointQueryOptimizationInsight
  }
};

export const ManySpans: Story = {
  args: {
    insight: {
      ...mockedEndpointQueryOptimizationInsight,
      spans: [
        {
          spanInfo: {
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
          criticality: 0.3,
          impact: 0,
          severity: 0,
          ticketLink: "https://digma.ai/1"
        },
        {
          spanInfo: {
            name: "1D138649EB4FFA92C0E3C8103404F2",
            displayName: "select * from users where id = :id 2",
            instrumentationLibrary: "SampleInsightsController",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F23",
            methodCodeObjectId: null,
            kind: "Client",
            codeObjectId: null
          },
          traceId: "9C510BC1E1CD59DD7E820BC3E8DFD4C43",
          duration: {
            value: 90.08,
            unit: "μs",
            raw: 70081
          },
          criticality: 0.3,
          impact: 0,
          severity: 0,
          ticketLink: "https://digma.ai/1"
        }
      ]
    }
  }
};
