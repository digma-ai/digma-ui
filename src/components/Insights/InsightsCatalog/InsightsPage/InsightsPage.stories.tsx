import type { Meta, StoryObj } from "@storybook/react";
import { InsightsPage } from ".";
import { ConfigContext, initialState } from "../../../common/App/ConfigContext";
import type { Scope } from "../../../common/App/types";
import type { InsightsPageProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightsPage> = {
  title: "Insights/InsightsCatalog/InsightsPage",
  component: InsightsPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const scope: Scope = {
  span: null,
  code: {
    relatedCodeDetailsList: [],
    codeDetailsList: []
  },
  hasErrors: false,
  issuesInsightsCount: 0,
  analyticsInsightsCount: 0,
  unreadInsightsCount: 0
};

const props: InsightsPageProps = {
  onJiraTicketCreate: () => {
    return undefined;
  },
  onRefresh: () => {
    return undefined;
  },
  isMarkAsReadButtonEnabled: false
};

export const WithInsights: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          scope: {
            ...scope,
            issuesInsightsCount: 1
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    ...props
  }
};

export const NoInsightsAndNoAnalyticsAtHome: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          scope
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: props
};

export const NoInsightsAndNoAnalyticsAtSpan: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          scope: {
            ...scope,
            span: {
              displayName: "displayName",
              spanCodeObjectId: "spanCodeObjectId",
              serviceName: null,
              role: "Internal",
              methodId: null
            }
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: props
};

export const NoInsightsButAnalyticsExist: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          scope: {
            ...scope,
            analyticsInsightsCount: 1
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: props
};

export const NoAnalyticsInsightsOnHomeScope: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          scope: undefined
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ],
  args: {
    ...props
  }
};
