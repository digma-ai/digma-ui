import type { Meta, StoryObj } from "@storybook/react";
import { NotificationCard } from ".";
import { InsightType } from "../../../types";
import { InsightScope } from "../../Insights/types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NotificationCard> = {
  title: "Notifications/NotificationCard",
  component: NotificationCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof NotificationCard>;

export const Default: Story = {
  args: {
    data: {
      notificationId: "1",
      accountId: "1",
      environment: "env",
      title: "Title",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      type: "insight",
      data: {
        insightType: InsightType.SpanEndpointBottleneck,
        scope: InsightScope.Span,
        spanInfo: {
          name: "WaitForLock",
          displayName: "WaitForLock",
          instrumentationLibrary: "SampleInsightsController",
          spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
          methodCodeObjectId: null,
          kind: null
        },
        codeObjectId: "SampleInsightsController$_$WaitForLock"
      },
      isRead: true,
      timestamp: "2023-01-07T12:59:21.794Z"
    }
  }
};
