import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { useTheme } from "styled-components";
import type { IncidentAgentEventSection } from "../../../../redux/services/types";
import { mockedAgentEvents } from "../AgentEventList/mockData";
import { AgentEventSection } from "../AgentEventSection";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AgentEventSection> = {
  title: "Agentic/common/AgentEventSection",
  component: AgentEventSection,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof AgentEventSection>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    data: {
      id: "kubernetes",
      name: "Kubernetes Investigator",
      description: "Objective: Look for any issues in namespace",
      status: "completed",
      events: mockedAgentEvents.filter((event) => event.type !== "human")
    },
    onNavigateToIncident: fn(),
    typeInitialEvents: false
  }
};

export const Multiple: Story = {
  args: {
    onNavigateToIncident: fn(),
    typeInitialEvents: false
  },
  render: (args) => {
    const theme = useTheme();

    const data: IncidentAgentEventSection[] = [
      {
        id: "kubernetes",
        name: "Kubernetes Investigator",
        description: "Objective: Look for any issues in namespace",
        status: "completed"
      },
      {
        id: "observability",
        name: "Observability Investigator",
        description: "Objective: Look for any issues in the traces",
        status: "running"
      },
      {
        id: "code",
        name: "Code Investigator",
        description: "Objective: Look for any issues in the repo codebase",
        status: "waiting"
      }
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: theme.colors.v3.surface.primary,
          minHeight: "100%",
          height: "max-content"
        }}
      >
        {data.map((section) => (
          <AgentEventSection
            key={section.id}
            {...args}
            data={{
              ...section,
              events: mockedAgentEvents.filter(
                (event) => event.type !== "human"
              )
            }}
          />
        ))}
      </div>
    );
  }
};
