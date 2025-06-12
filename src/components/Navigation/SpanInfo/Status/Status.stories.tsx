import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { sub } from "date-fns";
import { Status } from ".";

const timeAgo = ({ minutes = 0, days = 0, weeks = 0 }) => {
  const now = new Date();

  const date = sub(now, {
    minutes,
    days,
    weeks
  });

  return date.toISOString();
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

type Story = StoryObj<typeof Status>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Live: Story = {
  args: {
    lastSeen: timeAgo({ minutes: 1 }), // now
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

export const Inactive: Story = {
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
