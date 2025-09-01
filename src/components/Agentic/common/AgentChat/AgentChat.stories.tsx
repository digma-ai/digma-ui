import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useEffect, useState } from "react";
import { fn } from "storybook/test";
import { AgentChat } from ".";
import type { IncidentAgentEvent } from "../../../../redux/services/types";
import { mockedAgentEvents } from "../AgentEventList/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof AgentChat> = {
  title: "Agentic/common/AgentChat",
  component: AgentChat,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof AgentChat>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const EVENTS_CURSOR = 2;
const EVENTS_TIMEOUT = 2000;

export const Default: Story = {
  args: {
    data: mockedAgentEvents.slice(0, EVENTS_CURSOR),
    isDataLoading: false,
    onMessageSend: fn(),
    typeInitialMessages: false
  },
  render: (args) => {
    const [events, setEvents] = useState<IncidentAgentEvent[]>(args.data ?? []);

    useEffect(() => {
      // Simulate messages arriving progressively
      const timeouts: number[] = [];

      mockedAgentEvents.slice(EVENTS_CURSOR).forEach((event, index) => {
        const timeout = window.setTimeout(() => {
          setEvents((prev) => [...prev, event]);
        }, index * EVENTS_TIMEOUT);

        timeouts.push(timeout);
      });

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }, []);

    return <AgentChat {...args} data={events} />;
  }
};
