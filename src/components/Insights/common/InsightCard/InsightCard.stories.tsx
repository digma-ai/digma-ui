import { Meta, StoryObj } from "@storybook/react";
import { InsightCard } from ".";
import { ConfigContext, InitialData } from "../../../common/App/ConfigContext";
import { DeploymentType } from "../../../common/App/types";
import { mockedEndpointNPlusOneInsight } from "../../EndpointNPlusOneInsight/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightCard> = {
  title: "Insights/common/InsightCard",
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
    insight: { ...mockedEndpointNPlusOneInsight, criticality: 0.9 }
  }
};

export const JiraButtonIsPrimary: Story = {
  args: {
    isAsync: true,
    insight: { ...mockedEndpointNPlusOneInsight, criticality: 0.9 },
    onGoToLive: undefined,
    onPin: undefined,
    onGoToTrace: undefined,
    onOpenHistogram: undefined
  }
};

export const LinkedJiraTicket: Story = {
  args: {
    isAsync: true,
    insight: { ...mockedEndpointNPlusOneInsight, criticality: 0.9 },
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
      ...mockedEndpointNPlusOneInsight,
      criticality: 0.9,
      isDismissed: true
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

export const WithNewVersion: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...InitialData,
          backendInfo: {
            applicationVersion: "v0.2.243",
            deploymentType: DeploymentType.DOCKER_COMPOSE
          }
        }}
      >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    isAsync: true,
    insight: { ...mockedEndpointNPlusOneInsight, criticality: 0.9 }
  }
};
