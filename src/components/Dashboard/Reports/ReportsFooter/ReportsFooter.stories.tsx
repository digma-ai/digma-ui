import { Meta, StoryObj } from "@storybook/react";
import { ReportsFooter } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ReportsFooter> = {
  title: "Dashboard/Reports/ReportsFooter",
  component: ReportsFooter,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
