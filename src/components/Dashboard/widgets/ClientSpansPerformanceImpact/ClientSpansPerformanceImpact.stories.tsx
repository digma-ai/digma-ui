import type { Meta, StoryObj } from "@storybook/react";

import { ClientSpansPerformanceImpact } from ".";
import { actions } from "../../actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ClientSpansPerformanceImpact> = {
  title: "Dashboard/widgets/ClientSpansPerformanceImpact",
  component: ClientSpansPerformanceImpact,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithData: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA,
        payload: {
          data: {
            totalCount: 27,
            entries: [
              {
                spanCodeObjectId:
                  "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/new",
                displayName: "GET PetClinic /owners/new",
                overallImpact: 1.0
              },
              {
                spanCodeObjectId:
                  "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/SlowEndpoint",
                displayName: "GET PetClinic /SampleInsights/SlowEndpoint",
                overallImpact: 0.5411061584203873
              },
              {
                spanCodeObjectId:
                  "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /SampleInsights/SpanBottleneck",
                displayName: "GET PetClinic /SampleInsights/SpanBottleneck",
                overallImpact: 0.015331544891429908
              },
              {
                spanCodeObjectId:
                  "span:io.opentelemetry.okhttp-3.0$_$GET PetClinic /owners/{ownerId}",
                displayName: "GET PetClinic /owners/{ownerId}",
                overallImpact: 0.01180952993819851
              }
            ]
          },
          type: "ClientSpanOverallImpact",
          error: null
        }
      });
    }, 500);
  }
};

export const NoData: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA,
        payload: {
          data: {
            totalCount: 0,
            entries: []
          },
          type: "ClientSpanOverallImpact",
          error: null
        }
      });
    }, 500);
  }
};
