import { Meta, StoryObj } from "@storybook/react";

import { InsightsFilter } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightsFilter> = {
  title: "Insights/InsightsFilter",
  component: InsightsFilter,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    data: {
      categories: [
        {
          categoryName: "Services",
          entries: [
            {
              enabled: true,
              selected: true,
              name: "ClientTesterOfPetClinic"
            },
            {
              enabled: true,
              selected: false,
              name: "spring-petclinic"
            }
          ]
        },
        {
          categoryName: "Operations",
          categories: [
            {
              categoryName: "Endpoints",
              entries: [
                {
                  enabled: true,
                  selected: true,
                  name: "HTTP GET /"
                },
                {
                  enabled: false,
                  selected: false,
                  name: "HTTP GET /**"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /oups"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /owners"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /owners/{ownerId}"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /owners/find"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /owners/new"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/ErrorHotspot"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/ErrorRecordedOnCurrentSpan"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/ErrorRecordedOnDeeplyNestedSpan"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/ErrorRecordedOnLocalRootSpan"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/GenAsyncSpanVar01"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/HighUsage"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/NPlusOneWithInternalSpan"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/req-map-get"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/SlowEndpoint"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /SampleInsights/SpanBottleneck"
                },
                {
                  enabled: true,
                  selected: false,
                  name: "HTTP GET /vets.html"
                }
              ]
            },
            {
              categoryName: "Consumers",
              entries: []
            },
            {
              categoryName: "Internal",
              entries: [
                {
                  enabled: true,
                  selected: false,
                  name: "ClientTester.generateInsightData"
                }
              ]
            }
          ]
        },
        {
          categoryName: "Insights",
          entries: [
            {
              enabled: true,
              selected: false,
              name: "EndpointBreakdown"
            },
            {
              enabled: true,
              selected: false,
              name: "EndpointChattyApi"
            },
            {
              enabled: true,
              selected: false,
              name: "EndpointHighNumberOfQueries"
            },
            {
              enabled: true,
              selected: false,
              name: "EndpointSpaNPlusOne"
            },
            {
              enabled: true,
              selected: false,
              name: "HighUsage"
            },
            {
              enabled: true,
              selected: false,
              name: "LowUsage"
            },
            {
              enabled: true,
              selected: false,
              name: "SlowEndpoint"
            },
            {
              enabled: true,
              selected: false,
              name: "SlowestSpans"
            },
            {
              enabled: true,
              selected: false,
              name: "SpanScalingInsufficientData"
            }
          ]
        }
      ]
    }
  }
};
