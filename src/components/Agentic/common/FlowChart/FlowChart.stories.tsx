import type { Meta, StoryObj } from "@storybook/react";
import { FlowChart } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FlowChart> = {
  title: "Agentic/common/FlowChart",
  component: FlowChart,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof FlowChart>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    nodes: [
      {
        id: "1",
        position: { x: 0, y: -31 }, // TODO: find a way to center this
        data: {
          label: "Digma",
          orientation: "vertical",
          isActive: true,
          type: "input"
        }
      },
      {
        id: "2",
        position: { x: 200, y: 0 },
        data: { label: "Watchman", isActive: true }
      },
      {
        id: "3",
        position: { x: 500, y: 0 },
        data: { label: "Triage" }
      },
      {
        id: "4",
        position: { x: 800, y: -50 },
        data: { label: "Infra Resolution" }
      },
      {
        id: "5",
        position: { x: 800, y: 50 },
        data: { label: "Code Resolution" }
      },
      {
        id: "6",
        position: { x: 1100, y: 0 },
        data: { label: "Validator", type: "output" }
      }
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e3-4", source: "3", target: "4" },
      { id: "e3-5", source: "3", target: "5" },
      { id: "e4-6", source: "4", target: "6" },
      { id: "e5-6", source: "5", target: "6" }
    ]
  }
};
