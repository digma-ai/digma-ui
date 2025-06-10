import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { JiraButton } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof JiraButton> = {
  title: "common/v3/JiraButton",
  component: JiraButton,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof JiraButton>;

export const Default: Story = {
  args: {
    isHintEnabled: false
  }
};

export const ActiveWithTrace: Story = {
  args: {
    isHintEnabled: false,
    ticketLink: "test"
  }
};
