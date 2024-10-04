import { Meta, StoryObj } from "@storybook/react";

import { Status } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Status> = {
  title: "Navigation/SpanInfo/Status",
  component: Status,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Live: Story = {
  args: {
    lastSeen: new Date().toISOString(), // now
    firstSeen: new Date(
      new Date().getTime() - 59 * 60 * 1000 // 59 min ago
    ).toISOString()
  }
};

export const Recent: Story = {
  args: {
    lastSeen: new Date(
      new Date().getTime() - 59 * 60 * 1000 // 59 min ago
    ).toISOString(),
    firstSeen: new Date(
      new Date().getTime() - 3 * 24 * 60 * 60 * 1000 // 3 days ago
    ).toISOString()
  }
};

export const Active: Story = {
  args: {
    lastSeen: new Date(
      new Date().getTime() - 3 * 24 * 60 * 60 * 1000 // 3 days ago
    ).toISOString(),
    firstSeen: new Date(
      new Date().getTime() - 5 * 24 * 60 * 60 * 1000 // 5 days ago
    ).toISOString()
  }
};

export const InActive: Story = {
  args: {
    lastSeen: new Date(
      new Date().getTime() - 5 * 24 * 60 * 60 * 1000 // 5 days ago
    ).toISOString(),
    firstSeen: new Date(
      new Date().getTime() - 8 * 24 * 60 * 60 * 1000 // 1 week ago
    ).toISOString()
  }
};

export const Stale: Story = {
  args: {
    lastSeen: new Date(
      new Date().getTime() - 8 * 24 * 60 * 60 * 1000 // 8 days ago
    ).toISOString(),
    firstSeen: new Date(
      new Date().getTime() - 15 * 24 * 60 * 60 * 1000 //  week ago
    ).toDateString()
  }
};
