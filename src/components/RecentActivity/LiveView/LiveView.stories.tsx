import { Meta, StoryObj } from "@storybook/react";
import { LiveView } from ".";
import { mockData } from "./mockData";
import { LiveDataDurationPercentile } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LiveView> = {
  title: "Recent Activity/LiveView",
  component: LiveView,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const NoData: Story = {
  args: {
    data: {
      ...mockData,
      liveDataRecords: []
    }
  }
};

const percentile: LiveDataDurationPercentile = {
  ...mockData.durationData.percentiles[0]
};

export const WithData: Story = {
  args: {
    data: {
      ...mockData,
      durationData: {
        ...mockData.durationData,
        percentiles: [
          {
            ...percentile,
            previousDuration: null,
            changeVerified: null
          },
          ...mockData.durationData.percentiles.slice(1)
        ]
      }
    }
  }
};

export const WithSlowdown: Story = {
  args: {
    data: {
      ...mockData,
      durationData: {
        ...mockData.durationData,
        percentiles: [
          {
            ...percentile,
            previousDuration: {
              ...percentile.currentDuration,
              raw: percentile.currentDuration.raw - 1000000,
              value: percentile.currentDuration.value - 1
            },
            changeVerified: true
          },
          ...mockData.durationData.percentiles.slice(1)
        ]
      }
    }
  }
};

export const WithSpeedup: Story = {
  args: {
    data: {
      ...mockData,
      durationData: {
        ...mockData.durationData,
        percentiles: [
          {
            ...percentile,
            previousDuration: {
              ...percentile.currentDuration,
              raw: percentile.currentDuration.raw + 1000000,
              value: percentile.currentDuration.value + 1
            },
            changeVerified: true
          },
          ...mockData.durationData.percentiles.slice(1)
        ]
      }
    }
  }
};

export const WithEvaluating: Story = {
  args: {
    data: {
      ...mockData,
      durationData: {
        ...mockData.durationData,
        percentiles: [
          {
            ...percentile,
            previousDuration: {
              ...percentile.currentDuration,
              raw: percentile.currentDuration.raw + 1000000,
              value: percentile.currentDuration.value + 1
            },
            changeVerified: false
          },
          ...mockData.durationData.percentiles.slice(1)
        ]
      }
    }
  }
};

export const LowLatency: Story = {
  args: {
    data: {
      liveDataRecords: [
        {
          duration: {
            value: 0.13508,
            unit: "ms",
            raw: 135084
          },
          dateTime: "2023-06-30T10:30:18.9634654Z"
        }
      ],
      durationData: {
        percentiles: [
          {
            percentile: 0.5,
            currentDuration: {
              value: 0.13508,
              unit: "ms",
              raw: 135084
            },
            previousDuration: null,
            changeVerified: null
          },
          {
            percentile: 0.95,
            currentDuration: {
              value: 0.13508,
              unit: "ms",
              raw: 135084
            },
            previousDuration: null,
            changeVerified: null
          }
        ],
        codeObjectId:
          "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$method1",
        displayName: "SampleInsightsController.method1"
      }
    }
  }
};
