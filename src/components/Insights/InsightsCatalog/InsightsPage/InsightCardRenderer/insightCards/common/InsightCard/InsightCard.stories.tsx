import type { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from ".";
import {
  ConfigContext,
  initialState
} from "../../../../../../../common/App/ConfigContext";
import { DeploymentType } from "../../../../../../../common/App/types";
import { mockedEndpointSpanNPlusOneInsight } from "../../EndpointSpanNPlusOneInsightInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/common/InsightCard",
  component: InsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAsync: true,
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: true
    }
  }
};

export const JiraButtonIsPrimary: Story = {
  args: {
    isAsync: true,
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: true
    },
    onGoToLive: undefined,
    onPin: undefined,
    onGoToTrace: undefined,
    onOpenHistogram: undefined
  }
};

export const LinkedJiraTicket: Story = {
  args: {
    isAsync: true,
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: true
    },
    jiraTicketInfo: {
      ticketLink: "some",
      spanCodeObjectId: "test",
      isHintEnabled: false
    },
    onGoToLive: undefined,
    onPin: undefined,
    onGoToTrace: undefined,
    onOpenHistogram: undefined
  }
};

export const Dismissed: Story = {
  args: {
    isAsync: true,
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isDismissed: true,
      isRead: true
    },
    jiraTicketInfo: {
      ticketLink: "some",
      spanCodeObjectId: "test",
      isHintEnabled: false
    },
    onGoToLive: undefined,
    onPin: undefined,
    onGoToTrace: undefined,
    onOpenHistogram: undefined
  }
};

export const WithDisabledDismissed: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          backendInfo: {
            applicationVersion: "v0.2.243",
            deploymentType: DeploymentType.DOCKER_COMPOSE,
            centralize: false
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    isAsync: true,
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: true
    }
  }
};

export const Critical: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      criticality: 0.9,
      isRead: true
    }
  }
};

export const Unread: Story = {
  args: {
    insight: {
      ...mockedEndpointSpanNPlusOneInsight,
      isRead: false
    }
  }
};
