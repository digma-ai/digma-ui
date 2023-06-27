import { Meta, StoryObj } from "@storybook/react";
import { TopUsageTable } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TopUsageTable> = {
  title: "Insights/TopUsageTable",
  component: TopUsageTable,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        description: "At 1 call per second",
        p50: {
          value: 20,
          unit: "ms",
          raw: 20000000
        },
        p95: {
          value: 30,
          unit: "ms",
          raw: 30000000
        }
      },
      {
        description: "At 8 call per second",
        p50: {
          value: 50,
          unit: "ms",
          raw: 50000000
        },
        p95: {
          value: 80,
          unit: "ms",
          raw: 80000000
        }
      }
    ]
  }
};
