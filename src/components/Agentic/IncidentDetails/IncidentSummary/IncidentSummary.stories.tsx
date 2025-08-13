import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { IncidentSummary } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IncidentSummary> = {
  title: "Agentic/IncidentDetails/IncidentSummary/IncidentSummary",
  component: IncidentSummary,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof IncidentSummary>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    records: [
      {
        id: "1",
        agent_display_name: "triager",
        timestamp: "2023-10-01T12:00:00Z",
        text: "Lorem ipsum dolor sit amet"
      },
      {
        id: "2",
        agent_display_name: "code resolver",
        timestamp: "2023-10-01T12:00:00Z",
        text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        id: "3",
        agent_display_name: "infra resolver",
        timestamp: "2023-10-01T12:00:00Z",
        text: "Lorem ipsum dolor sit amet"
      }
    ]
  }
};
