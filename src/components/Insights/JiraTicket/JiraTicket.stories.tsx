import { Meta, StoryObj } from "@storybook/react";
import { JiraTicket } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof JiraTicket> = {
  title: "Insights/JiraTicket",
  component: JiraTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: "Summary text",
    description: { text: "Multiline \ndescription text", isLoading: false },
    attachment: { url: "https://www.example.com", fileName: "attachment.ext" }
  }
};
