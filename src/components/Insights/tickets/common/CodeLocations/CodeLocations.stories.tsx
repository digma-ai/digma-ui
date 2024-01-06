import { Meta, StoryObj } from "@storybook/react";
import { CodeLocations } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CodeLocations> = {
  title: "Insights/tickets/common/CodeLocations",
  component: CodeLocations,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    codeLocations: ["codeLocation1", "codeLocation2"]
  }
};

export const Empty: Story = {};
