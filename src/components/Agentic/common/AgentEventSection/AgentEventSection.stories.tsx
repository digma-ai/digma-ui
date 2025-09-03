import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useTheme } from "styled-components";
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
    data: mockedAgentEvents.find((event) => event.type === "section"),
    typeInitialEvents: false
  }
};

export const Multiple: Story = {
  args: {
    typeInitialEvents: false
  },
  render: (args) => {
    const theme = useTheme();

    const data = mockedAgentEvents.filter((event) => event.type === "section");

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
