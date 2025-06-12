import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { JiraTicket } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof JiraTicket> = {
  title: "common/JiraTicket",
  component: JiraTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof JiraTicket>;

export const Default: Story = {
  args: {
    summary: "Summary text",
    description: { content: "Multiline\ndescription text", isLoading: false },
    attachments: [
      { url: "https://www.example.com", fileName: "attachment.ext" }
    ]
  }
};
