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

export const Default: Story = {
  args: {
    data: {
      notifications: [
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
          timestamp: new Date().toISOString()
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
          timestamp: new Date().toISOString()
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
          timestamp: new Date().toISOString()
        }
      ]
    }
  }
};
