import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ReportFooter } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ReportFooter> = {
  title: "Dashboard/Report/ReportFooter",
  component: ReportFooter,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof ReportFooter>;

export const Default: Story = {};
