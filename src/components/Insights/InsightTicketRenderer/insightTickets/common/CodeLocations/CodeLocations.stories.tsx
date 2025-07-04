import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CodeLocations } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CodeLocations> = {
  title: "Insights/InsightTicketRenderer/insightTickets/common/CodeLocations",
  component: CodeLocations,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof CodeLocations>;

export const Default: Story = {
  args: {
    codeLocations: ["codeLocation1", "codeLocation2"]
  }
};

export const Empty: Story = {};
