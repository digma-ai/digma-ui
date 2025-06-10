import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ReportCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ReportCard> = {
  title: "Dashboard/Report/ReportCard",
  component: ReportCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof ReportCard>;

export const Default: Story = {};
