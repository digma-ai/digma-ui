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

// TODO: move to common
export const InsightTicketRenderer = ({
  data,
  onClose,
  backendInfo
}: InsightTicketRendererProps) => {
  if (isSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpaNPlusOneInsight>;
    return (
      <SpaNPlusOneInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  if (isEndpointSpanNPlusOneInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointSpanNPlusOneInsight>;
    return (
      <EndpointSpanNPlusOneInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  if (isSpanEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanEndpointBottleneckInsight>;
    return (
      <SpanEndpointBottleneckInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  if (isEndpointBottleneckInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<EndpointBottleneckInsight>;
    return (
      <EndpointBottleneckInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanQueryOptimizationInsight>;
    return (
      <SpanQueryOptimizationInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  if (isEndpointQueryOptimizationV2Insight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointQueryOptimizationV2Insight>;
    return (
      <EndpointQueryOptimizationV2InsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(data.insight)) {
    const ticketData =
      data as InsightTicketInfo<EndpointHighNumberOfQueriesInsight>;
    return (
      <EndpointHighNumberOfQueriesInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
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
          onClose={onClose}
          backendInfo={backendInfo}
        />
      );
    } else {
      return (
        <SpanScalingInsightTicket
          data={ticketData}
          onClose={onClose}
          backendInfo={backendInfo}
        />
      );
    }
  }

  if (isSpanPerformanceAnomalyInsight(data.insight)) {
    const ticketData = data as InsightTicketInfo<SpanPerformanceAnomalyInsight>;
    return (
      <SpanPerformanceAnomalyInsightTicket
        data={ticketData}
        onClose={onClose}
        backendInfo={backendInfo}
      />
    );
  }

  return null;
};
