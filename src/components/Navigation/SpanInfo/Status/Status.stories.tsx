import { Meta, StoryObj } from "@storybook/react";

import { Status } from ".";

const timeAgo = ({ minutes = 0, days = 0, weeks = 0 }) => {
  const now = new Date();

  const interval = minutes + (days + weeks * 7) * 24 * 60;
  return new Date(now.getTime() - interval * 60 * 1000).toDateString();
};

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
    firstSeen: timeAgo({ minutes: 59 })
  }
};

export const Recent: Story = {
  args: {
    lastSeen: timeAgo({ minutes: 59 }),
    firstSeen: timeAgo({ days: 3 })
  }
};

export const Active: Story = {
  args: {
    lastSeen: timeAgo({ days: 3 }),
    firstSeen: timeAgo({ days: 5 })
  }
};

export const InActive: Story = {
  args: {
    lastSeen: timeAgo({ days: 5 }),
    firstSeen: timeAgo({ days: 8 })
  }
};

export const Stale: Story = {
  args: {
    lastSeen: timeAgo({ days: 8 }),
    firstSeen: timeAgo({ days: 15 })
  }
};
