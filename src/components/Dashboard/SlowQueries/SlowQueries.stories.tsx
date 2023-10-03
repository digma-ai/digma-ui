import { Meta, StoryObj } from "@storybook/react";

import { SlowQueries } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SlowQueries> = {
  title: "Dashboard/SlowQueries",
  component: SlowQueries,
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
      data: {
        entries: [
          {
            displayName: "select * from users where id = :id",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F1",
            p50: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            p95: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            type: "SlowQuery"
          },
          {
            displayName: "select * from users where id = :id",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F2",
            p50: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            p95: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            type: "SlowQuery"
          },
          {
            displayName: "select * from users where id = :id",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F3",
            p50: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            p95: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            type: "SlowQuery"
          },
          {
            displayName: "select * from users where id = :id",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F4",
            p50: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            p95: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            type: "SlowQuery"
          },
          {
            displayName: "select * from users where id = :id",
            spanCodeObjectId:
              "span:SampleInsightsController$_$1D138649EB4FFA92C0E3C8103404F5",
            p50: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            p95: {
              value: 70.08,
              unit: "μs",
              raw: 70081
            },
            type: "SlowQuery"
          }
        ],
        totalCount: 25
      },
      type: "SlowQuery"
    }
  }
};
