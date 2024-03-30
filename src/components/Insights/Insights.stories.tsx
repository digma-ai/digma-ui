import { Meta, StoryObj } from "@storybook/react";
import { Insights } from ".";
import { mockedEndpointBreakdownInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointBreakdownInsightCard/mockData";
import { mockedEndpointHighNumberOfQueriesInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointHighNumberOfQueriesInsightCard/mockData";
import { mockedEndpointSpanNPlusOneInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointSpanNPlusOneInsightInsightCard/mockData";
import { mockedEndpointNormalUsageInsight } from "./InsightsCatalog/InsightsPage/insightCards/EndpointUsageInsightCard/mockData";
import { mockedSpaNPlusOneInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpaNPlusOneInsightCard/mockData";
import { mockedSpanDurationBreakdownInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanDurationBreakdownInsightCard/mockData";
import { mockedSpanDurationsInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanDurationsInsightCard/mockData";
import { mockedSpanEndpointBottleneckInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanEndpointBottleneckInsightCard/mockData";
import { mockedSpanNexusInsight } from "./InsightsCatalog/InsightsPage/insightCards/SpanNexusInsightCard/mockData";
import { InsightsStatus, ViewMode } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Insights> = {
  title: "Insights/Insights",
  component: Insights,
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
  }
};

export const NoInsights: Story = {
  args: {
    data: {
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
  }
};

export const NoDataYet: Story = {
  args: {
    data: {
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
  }
};

export const ProcessingInsights: Story = {
  args: {
    data: {
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
  }
};

export const NoObservability: Story = {
  args: {
    data: {
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
  }
};

export const NoObservabilityWithInsights: Story = {
  args: {
    data: {
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
  }
};

export const HasMissingDependency: Story = {
  args: {
    data: {
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
  }
};

export const HasMissingDependencyWithInsights: Story = {
  args: {
    data: {
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
  }
};

export const Startup: Story = {
  args: {
    data: {
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
  }
};

export const Preview: Story = {
  args: {
    data: {
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
  }
};
