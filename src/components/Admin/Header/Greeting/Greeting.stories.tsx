import type { Meta, StoryObj } from "@storybook/react";
import { Greeting } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Greeting> = {
  title: "Admin/Admin/Header/Greeting",
  component: Greeting,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Morning: Story = {
  args: {
    currentDateTime: new Date("1970-01-01T09:00:00Z").valueOf()
  }
};

export const Afternoon: Story = {
  args: {
    currentDateTime: new Date("1970-01-01T14:00:00Z").valueOf()
  }
};

export const Evening: Story = {
  args: {
    currentDateTime: new Date("1970-01-01T19:00:00Z").valueOf()
  }
};
