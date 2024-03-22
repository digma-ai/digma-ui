import { Meta, StoryObj } from "@storybook/react";
import { InsightsPage } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";
import { Scope } from "../../common/App/types";
import { ViewMode } from "../InsightsCatalog/types";
import { mockedSpanBottleneckInsight } from "../common/insights/EndpointBottleneckInsight/mockData";
import { InsightsPageProps } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightsPage> = {
  title: "Insights/InsightsPage",
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
  insights: [],
  isFilteringEnabled: false,
  onJiraTicketCreate: () => {
    return undefined;
  },
  onRefresh: () => {
    return undefined;
  },
  page: 0,
  viewMode: ViewMode.All
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
    ...props,
    insights: [mockedSpanBottleneckInsight]
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
              role: "Internal"
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

export const NoInsightsWithAppliedFilters: Story = {
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
  args: {
    ...props,
    isFilteringEnabled: true
  }
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
