import type { Meta, StoryObj } from "@storybook/react";
import { InsightsCatalog } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InsightsCatalog> = {
  title: "Insights/InsightsCatalog",
  component: InsightsCatalog,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStats: Story = {
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          insightStats: {
            allIssuesCount: 100,
            criticalInsightsCount: 5,
            issuesInsightsCount: 14,
            unreadInsightsCount: 20,
            analyticsInsightsCount: 10,
            scope: null
          }
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
