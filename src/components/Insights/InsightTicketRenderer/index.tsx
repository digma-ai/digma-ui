import {
  isEndpointBottleneckInsight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointQueryOptimizationV2Insight,
  isEndpointSpanNPlusOneInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
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
  SpaNPlusOneInsight,
  SpanQueryOptimizationInsight,
  SpanScalingInsight
} from "../types";
import { EndpointBottleneckInsightTicket } from "./insightTickets/EndpointBottleneckInsightTicket";
import { EndpointHighNumberOfQueriesInsightTicket } from "./insightTickets/EndpointHighNumberOfQueriesInsightTicket";
import { EndpointQueryOptimizationV2InsightTicket } from "./insightTickets/EndpointQueryOptimizationV2InsightTicket";
import { EndpointSpanNPlusOneInsightTicket } from "./insightTickets/EndpointSpanNPlusOneInsightTicket";
import { SpanEndpointBottleneckInsightTicket } from "./insightTickets/SpanEndpointBottleneckInsightTicket";
import { SpaNPlusOneInsightTicket } from "./insightTickets/SpaNPlusOneInsightTicket";
import { SpanQueryOptimizationInsightTicket } from "./insightTickets/SpanQueryOptimizationInsightTicket";
import { SpanScalingByRootCauseInsightTicket } from "./insightTickets/SpanScalingByRootCauseInsightTicket";
import { SpanScalingInsightTicket } from "./insightTickets/SpanScalingInsightTicket";
import type { InsightTicketRendererProps } from "./types";

// TODO: Move to common
export const InsightTicketRenderer = ({
  data,
  refreshInsights,
  onClose,
  environmentId
}: InsightTicketRendererProps) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpaNPlusOneInsight>;
    return (
      <SpaNPlusOneInsightTicket
        data={ticketData}
        refreshInsights={refreshInsights}
        onClose={onClose}
        environmentId={environmentId}
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
        environmentId={environmentId}
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
        environmentId={environmentId}
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
        environmentId={environmentId}
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
        environmentId={environmentId}
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
        environmentId={environmentId}
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
        environmentId={environmentId}
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
          environmentId={environmentId}
        />
      );
    } else {
      return (
        <SpanScalingInsightTicket
          data={ticketData}
          refreshInsights={refreshInsights}
          onClose={onClose}
          environmentId={environmentId}
        />
      );
    }
  }

  return null;
};
