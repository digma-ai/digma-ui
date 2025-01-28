import {
  isEndpointBottleneckInsight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointQueryOptimizationV2Insight,
  isEndpointSpanNPlusOneInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanPerformanceAnomalyInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight
} from "../typeGuards";
import type {
  EndpointBottleneckInsight,
  EndpointHighNumberOfQueriesInsight,
  EndpointQueryOptimizationV2Insight,
  EndpointSpanNPlusOneInsight,
  InsightTicketInfo,
  SpanEndpointBottleneckInsight,
  SpanPerformanceAnomalyInsight,
  SpaNPlusOneInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight
} from "../types";
import { EndpointBottleneckInsightTicket } from "./insightTickets/EndpointBottleneckInsightTicket";
import { EndpointHighNumberOfQueriesInsightTicket } from "./insightTickets/EndpointHighNumberOfQueriesInsightTicket";
import { EndpointQueryOptimizationV2InsightTicket } from "./insightTickets/EndpointQueryOptimizationV2InsightTicket";
import { EndpointSpanNPlusOneInsightTicket } from "./insightTickets/EndpointSpanNPlusOneInsightTicket";
import { SpanEndpointBottleneckInsightTicket } from "./insightTickets/SpanEndpointBottleneckInsightTicket";
import { SpanPerformanceAnomalyInsightTicket } from "./insightTickets/SpanPerformanceAnomalyInsightTicket";
import { SpaNPlusOneInsightTicket } from "./insightTickets/SpaNPlusOneInsightTicket";
import { SpanQueryOptimizationInsightTicket } from "./insightTickets/SpanQueryOptimizationInsightTicket";
import { SpanScalingByRootCauseInsightTicket } from "./insightTickets/SpanScalingByRootCauseInsightTicket";
import { SpanScalingInsightTicket } from "./insightTickets/SpanScalingInsightTicket";
import type { InsightTicketRendererProps } from "./types";

// TODO: Move to common
export const InsightTicketRenderer = ({
  data,
  refreshInsights,
  onClose
}: InsightTicketRendererProps) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpaNPlusOneInsight>;
    return (
      <SpaNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointSpanNPlusOneInsight>;
    return (
      <EndpointSpanNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanEndpointBottleneckInsight>;
    return (
      <SpanEndpointBottleneckInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointBottleneckInsight>;
    return (
      <EndpointBottleneckInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanQueryOptimizationInsight>;
    return (
      <SpanQueryOptimizationInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointQueryOptimizationV2Insight>;
    return (
      <EndpointQueryOptimizationV2InsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointHighNumberOfQueriesInsight>;
    return (
      <EndpointHighNumberOfQueriesInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  if (isSpanScalingBadlyInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanScalingInsight>;
    const selectedRootCause = data.insight.rootCauseSpans.find(
      (r) => r.spanCodeObjectId == data.spanCodeObjectId
    );
    if (selectedRootCause) {
      return (
        <SpanScalingByRootCauseInsightTicket
          rootCauseSpanInfo={selectedRootCause}
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
        />
      );
    } else {
      return (
        <SpanScalingInsightTicket
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
        />
      );
    }
  }

  if (isSpanPerformanceAnomalyInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanPerformanceAnomalyInsight>;
    return (
      <SpanPerformanceAnomalyInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
      />
    );
  }

  return null;
};
