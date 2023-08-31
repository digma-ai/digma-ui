// name: "HTTP POST Transfer/TransferFunds",
// spanCodeObjectId:
//   "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",

import { Meta, StoryObj } from "@storybook/react";
import { Notifications } from ".";
import { InsightType } from "../../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Notifications> = {
  title: "Notifications/Notifications",
  component: Notifications,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const notifications = [
  {
    notificationId: "1",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.HotSpot,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: false,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "2",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointBreakdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "3",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "4",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "5",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "6",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "7",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "8",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "9",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "10",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "11",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "12",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "insight",
    data: {
      insightType: InsightType.EndpointDurationSlowdown,
      codeObject: {
        displayName: "HTTP POST Transfer/TransferFunds",
        codeObjectId:
          "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds"
      }
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  }
];

export const NoDataRecent: Story = {
  args: {
    data: {
      notifications: [],
      totalCount: 0,
      unreadCount: 0
    },
    viewMode: "popup"
  }
};

export const Recent: Story = {
  args: {
    data: {
      notifications: notifications.slice(0, 3),
      totalCount: 3,
      unreadCount: 1
    },
    viewMode: "popup"
  }
};

export const NoDataFull: Story = {
  args: {
    data: {
      notifications: [],
      totalCount: 0,
      unreadCount: 0
    },
    viewMode: "full"
  }
};

export const Full: Story = {
  args: {
    data: {
      notifications,
      totalCount: 12,
      unreadCount: 1
    },
    viewMode: "full"
  }
};
