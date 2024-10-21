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
      liveDataRecords: [],
      durationData: {
        ...mockData.durationData,
        percentiles: []
      }
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

export const WithAllErrorsData: Story = {
  args: {
    data: {
      liveDataRecords: mockData.liveDataRecords.map((x) => ({
        ...x,
        isError: true
      })),
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

export const WithLowLatencyData: Story = {
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

export const WithDataOutsideOfTheArea: Story = {
  args: {
    data: {
      liveDataRecords: [
        {
          duration: {
            value: 1.92,
            unit: "ms",
            raw: 1921300
          },
          dateTime: "2023-07-04T13:52:49.3801706Z"
        },
        {
          duration: {
            value: 2.16,
            unit: "ms",
            raw: 2158300
          },
          dateTime: "2023-07-04T13:52:59.9520074Z"
        },
        {
          duration: {
            value: 5.33,
            unit: "ms",
            raw: 5333600
          },
          dateTime: "2023-07-04T13:53:04.5185513Z"
        },
        {
          duration: {
            value: 5.86,
            unit: "ms",
            raw: 5855900
          },
          dateTime: "2023-07-04T13:53:14.8785927Z"
        },
        {
          duration: {
            value: 5.24,
            unit: "ms",
            raw: 5238100
          },
          dateTime: "2023-07-04T13:53:25.2289013Z"
        },
        {
          duration: {
            value: 7.34,
            unit: "ms",
            raw: 7343000
          },
          dateTime: "2023-07-04T13:53:35.6438918Z"
        },
        {
          duration: {
            value: 190.23,
            unit: "ms",
            raw: 190230600
          },
          dateTime: "2023-07-04T13:54:05.783907Z"
        },
        {
          duration: {
            value: 2.15,
            unit: "ms",
            raw: 2147000
          },
          dateTime: "2023-07-04T13:54:34.390596Z"
        }
      ],
      durationData: {
        percentiles: [
          {
            percentile: 0.5,
            currentDuration: {
              value: 247.68,
              unit: "ms",
              raw: 247684600
            },
            previousDuration: {
              value: 685.83,
              unit: "ms",
              raw: 685825500
            },
            changeVerified: false
          },
          {
            percentile: 0.95,
            currentDuration: {
              value: 6.28,
              unit: "sec",
              raw: 6284576400
            },
            previousDuration: {
              value: 7.25,
              unit: "sec",
              raw: 7247733745
            },
            changeVerified: true
          }
        ],
        codeObjectId:
          "method:Digma.PluginBackend.Controllers.CodeAnalyticsController$_$GetInsightsOfMethods(InsightOfMethodsRequest)",
        displayName: "HTTP POST CodeAnalytics/codeObjects/insights_of_methods"
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
