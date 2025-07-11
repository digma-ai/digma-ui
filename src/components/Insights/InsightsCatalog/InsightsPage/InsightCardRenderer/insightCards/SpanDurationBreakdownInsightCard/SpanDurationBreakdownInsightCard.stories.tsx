import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { SpanDurationBreakdownInsightCard } from ".";
import { featureFlagMinBackendVersions } from "../../../../../../../featureFlags";
import { FeatureFlag } from "../../../../../../../types";
import {
  ConfigContext,
  initialState
} from "../../../../../../common/App/ConfigContext";
import { DeploymentType } from "../../../../../../common/App/types";
import { mockedSpanDurationBreakdownInsight } from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SpanDurationBreakdownInsightCard> = {
  title:
    "Insights/InsightsCatalog/InsightsPage/InsightCardRenderer/insightCards/SpanDurationBreakdownInsightCard",
  component: SpanDurationBreakdownInsightCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

const mockedConfig = {
  ...initialState,
  backendInfo: {
    applicationVersion:
      featureFlagMinBackendVersions[
        FeatureFlag.IsDurationBreakdownQuantityEnabled
      ],
    deploymentType: DeploymentType.Helm,
    centralize: true
  }
};

export default meta;

type Story = StoryObj<typeof SpanDurationBreakdownInsightCard>;

export const Default: Story = {
  args: {
    insight: mockedSpanDurationBreakdownInsight
  }
};

export const WithQuantity: Story = {
  args: {
    insight: mockedSpanDurationBreakdownInsight
  },
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
