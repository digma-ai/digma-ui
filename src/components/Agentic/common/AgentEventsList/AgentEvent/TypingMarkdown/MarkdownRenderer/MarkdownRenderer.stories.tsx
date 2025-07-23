import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { MarkdownRenderer } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MarkdownRenderer> = {
  title:
    "Agentic/common/AgentEventsList/AgentEvent/TypingMarkdown/MarkdownRenderer",
  component: MarkdownRenderer,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof MarkdownRenderer>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    text: `I'll help investigate this incident following the established process.

1. Scope of Work:
    - Incident involves performance degradation in Patient Records query in MySQL
    - Affects spring-petclinic.main service
    - Specific issue ID: b3e0d82a-662e-11f0-8757-3a7d612f2bc2
    - Has a relevant trace ID: D323FD8B7A20F936D43F3D8A3E2BF7A7

2. Initial Plan:
    1. Use Digma tool to analyze observability data and establish timeline
    2. Use Database investigation tool to examine MySQL query performance
    3. Use Code investigation tool to check for recent changes
    4. Update incident record with findings

Let's begin the investigation:

1. First, let's get observability data:
`
  }
};
