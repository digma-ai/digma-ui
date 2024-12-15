import type { Meta, StoryObj } from "@storybook/react";
import { Insights } from ".";
import { ConfigContext, initialState } from "../common/App/ConfigContext";
import type { ConfigContextData } from "../common/App/types";
import { actions as globalActions } from "./../../actions";
import { IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY } from "./InsightsCatalog/InsightsPage";
import { mockedEndpointBreakdownInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointBreakdownInsightCard/mockData";
import { mockedEndpointHighNumberOfQueriesInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointHighNumberOfQueriesInsightCard/mockData";
import { mockedEndpointSpanNPlusOneInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointSpanNPlusOneInsightInsightCard/mockData";
import { mockedEndpointNormalUsageInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointUsageInsightCard/mockData";
import { mockedSpaNPlusOneInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpaNPlusOneInsightCard/mockData";
import { mockedSpanDurationBreakdownInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanDurationBreakdownInsightCard/mockData";
import { mockedSpanDurationsInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanDurationsInsightCard/mockData";
import { mockedSpanEndpointBottleneckInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanEndpointBottleneckInsightCard/mockData";
import { mockedSpanNexusInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanNexusInsightCard/mockData";
import { actions as issuesActions } from "./Issues/actions";
import { actions } from "./actions";
import { InsightsStatus, ViewMode } from "./types";

const mockedConfig: ConfigContextData = {
  ...initialState,
  environments: [
    {
      id: "1",
      name: "Development",
      type: "Public"
    }
  ]
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Insights> = {
  title: "Insights/Insights",
  component: Insights,
  decorators: [
    (Story) => (
      <ConfigContext.Provider value={mockedConfig}>
        <Story />
      </ConfigContext.Provider>
    )
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          totalCount: 100,
          // spans: [
          //   {
          //     spanCodeObjectId: "empty_span1_id",
          //     spanDisplayName: "empty_span1"
          //   },
          //   {
          //     spanCodeObjectId: "empty_span2_id",
          //     spanDisplayName: "empty_span2"
          //   }
          // ],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          viewMode: ViewMode.INSIGHTS,
          // hasMissingDependency: false,
          insightsStatus: InsightsStatus.DEFAULT,
          // methods: [],
          // canInstrumentMethod: false,
          // needsObservabilityFix: false,
          insights: [
            mockedSpaNPlusOneInsight,
            mockedEndpointBreakdownInsight,
            mockedEndpointNormalUsageInsight,
            mockedSpanDurationBreakdownInsight,
            mockedSpanDurationsInsight,
            mockedEndpointSpanNPlusOneInsight,
            mockedSpanEndpointBottleneckInsight,
            mockedEndpointHighNumberOfQueriesInsight,
            mockedSpanNexusInsight
          ]
        }
      });
    }, 500);
  }
};

export const Issues: Story = {
  args: {
    insightViewType: "Issues"
  },
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: issuesActions.SET_FILTERS,
        payload: {
          issueTypeFilters: [
            {
              enabled: true,
              name: "SlowEndpoint"
            },
            {
              enabled: true,
              name: "NPlusOne"
            },
            {
              enabled: false,
              name: "ChattyApi"
            }
          ],
          services: ["service-one", "service-two"]
        }
      });
    });

    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: issuesActions.SET_DATA_LIST,
        payload: {
          totalCount: 100,
          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.DEFAULT,
          insights: [
            mockedSpaNPlusOneInsight,
            mockedEndpointBreakdownInsight,
            mockedEndpointNormalUsageInsight,
            mockedSpanDurationBreakdownInsight,
            mockedSpanDurationsInsight,
            mockedEndpointSpanNPlusOneInsight,
            mockedSpanEndpointBottleneckInsight,
            mockedEndpointHighNumberOfQueriesInsight,
            mockedSpanNexusInsight
          ]
        }
      });
    }, 500);
  }
};

export const WithJiraHint: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: globalActions.SET_FROM_PERSISTENCE,
        payload: {
          key: IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
          value: {
            value: false
          },
          scope: "application",
          error: null
        }
      });
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          totalCount: 100,
          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.DEFAULT,
          insights: [
            mockedSpaNPlusOneInsight,
            mockedEndpointBreakdownInsight,
            mockedEndpointNormalUsageInsight,
            mockedSpanDurationBreakdownInsight,
            mockedSpanDurationsInsight,
            mockedEndpointSpanNPlusOneInsight,
            mockedSpanEndpointBottleneckInsight,
            mockedEndpointHighNumberOfQueriesInsight,
            mockedSpanNexusInsight
          ]
        }
      });
    }, 500);
  }
};

export const NoInsights: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // canInstrumentMethod: false,
          // needsObservabilityFix: false,
          // hasMissingDependency: false,
          // methods: [],

          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.NO_INSIGHTS,
          insights: [],
          totalCount: 0
        }
      });
    }, 500);
  }
};

export const NoDataYet: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // canInstrumentMethod: false,
          // needsObservabilityFix: false,
          // hasMissingDependency: false,
          // methods: [],

          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.NO_SPANS_DATA,
          insights: [],
          totalCount: 0
        }
      });
    }, 500);
  }
};

export const ProcessingInsights: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // hasMissingDependency: false,
          // methods: [],
          // canInstrumentMethod: false,
          // needsObservabilityFix: false,

          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.INSIGHT_PENDING,
          insights: [],
          totalCount: 0
        }
      });
    }, 500);
  }
};

export const NoObservability: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // hasMissingDependency: false,
          // methods: [],
          // canInstrumentMethod: true,
          // needsObservabilityFix: true

          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.NO_OBSERVABILITY,
          insights: [],
          totalCount: 0
        }
      });
    }, 500);
  }
};

export const NoObservabilityWithInsights: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.DEFAULT,
          insights: [mockedSpaNPlusOneInsight],
          totalCount: 0

          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // hasMissingDependency: false,
          // methods: [],
          // canInstrumentMethod: true,
          // needsObservabilityFix: true
        }
      });
    }, 500);
  }
};

export const HasMissingDependency: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // hasMissingDependency: true,
          // methods: [],
          // canInstrumentMethod: true,
          // needsObservabilityFix: true
          viewMode: ViewMode.INSIGHTS,
          totalCount: 0,
          insightsStatus: InsightsStatus.NO_OBSERVABILITY,
          insights: []
        }
      });
    }, 500);
  }
};

export const HasMissingDependencyWithInsights: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          // spans: [],
          // assetId: "string",
          // serviceName: "string",
          // environment: "string",
          // hasMissingDependency: true,
          // methods: [],
          // canInstrumentMethod: true,
          // needsObservabilityFix: true,

          viewMode: ViewMode.INSIGHTS,
          insightsStatus: InsightsStatus.DEFAULT,
          insights: [mockedSpaNPlusOneInsight],
          totalCount: 0
        }
      });
    }, 500);
  }
};

export const Startup: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          viewMode: ViewMode.INSIGHTS,
          insights: [],
          insightsStatus: InsightsStatus.STARTUP,
          totalCount: 0
          // spans: [],
          // serviceName: "string",
          // environment: "string",
          // methods: [],
          // canInstrumentMethod: false,
          // needsObservabilityFix: false
          // hasMissingDependency: false,
        }
      });
    }, 500);
  }
};

export const Preview: Story = {
  play: () => {
    window.setTimeout(() => {
      window.postMessage({
        type: "digma",
        action: actions.SET_DATA_LIST,
        payload: {
          viewMode: ViewMode.PREVIEW,
          totalCount: 0,
          insightsStatus: InsightsStatus.DEFAULT,
          // spans: [],
          // serviceName: "string",
          // environment: "string",
          // hasMissingDependency: false,
          // canInstrumentMethod: false,
          // methods: [
          //   {
          //     id: "method1",
          //     name: "method1"
          //   },
          //   {
          //     id: "method2",
          //     name: "method2"
          //   },
          //   {
          //     id: "method3",
          //     name: "method3"
          //   }
          // ],
          insights: []
          // needsObservabilityFix: false
        }
      });
    }, 500);
  }
};
