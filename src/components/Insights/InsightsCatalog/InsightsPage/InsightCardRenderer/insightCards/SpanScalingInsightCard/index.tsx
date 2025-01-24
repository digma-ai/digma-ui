import { usePagination } from "../../../../../../../hooks/usePagination";
import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../../utils/trimEndpointScheme";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../../common/v3/Button";
import { JiraButton } from "../../../../../../common/v3/JiraButton";
import { Pagination } from "../../../../../../common/v3/Pagination";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type {
  InsightType,
  RootCauseSpanInfo,
  Trace
} from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Description } from "../styles";
import * as s from "./styles";
import type { SpanScalingInsightCardProps } from "./types";

const PAGE_SIZE = 3;

export const SpanScalingInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onHistogramButtonClick,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: SpanScalingInsightCardProps) => {
  const { isJaegerEnabled } = useConfigSelector();
  const affectedEndpoints = insight.affectedEndpoints ?? [];
  const [pageItems, page, setPage] = usePagination(
    affectedEndpoints,
    PAGE_SIZE,
    insight.id
  );

  const handleLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  const renderRootCause = (rootCauseSpans: RootCauseSpanInfo[]) => {
    if (rootCauseSpans.length > 0) {
      return (
        <s.List>
          <Description>Caused by</Description>
          {rootCauseSpans.map((span, i) => {
            const spanName = span.displayName;
            const traceId = span.sampleTraceId;
            const spanCodeObjectId = span.spanCodeObjectId;

            const buttons = [
              <JiraButton
                key={"view-ticket-info"}
                onTicketInfoOpen={handleTicketInfoButtonClick}
                spanCodeObjectId={spanCodeObjectId}
                ticketLink={insight.ticketLink}
                isHintEnabled={isJiraHintEnabled && i === 0}
                insightType={insight.type}
                type={"icon"}
              />
            ];

            if (isJaegerEnabled && traceId) {
              buttons.push(
                <Button
                  key={"trace"}
                  icon={TraceIcon}
                  onClick={() =>
                    handleTraceButtonClick(
                      {
                        name: spanName,
                        id: traceId
                      },
                      insight.type,
                      spanCodeObjectId
                    )
                  }
                />
              );
            }
            return (
              <s.StyledListItem
                key={spanCodeObjectId}
                name={spanName}
                onClick={() => handleLinkClick(spanCodeObjectId)}
                endContent={buttons}
              />
            );
          })}
        </s.List>
      );
    }
  };

  const durationRangeString = `${getDurationString(
    insight.minDuration
  )} - ${getDurationString(insight.maxDuration)}`;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <s.InsightDescription>
            {insight.shortDisplayInfo.description}
          </s.InsightDescription>
          <ColumnsContainer>
            <KeyValue label={"Tested concurrency"}>
              {insight.maxConcurrency}
            </KeyValue>
            <KeyValue
              label={"Duration"}
              info={
                "The execution time range from minimal  to maximum duration"
              }
            >
              {durationRangeString}
            </KeyValue>
          </ColumnsContainer>
          {renderRootCause(insight.rootCauseSpans)}
          {affectedEndpoints.length > 0 && (
            <s.List>
              <Description>Affected Endpoints</Description>
              {pageItems.map((endpoint) => {
                const endpointRoute = trimEndpointScheme(endpoint.route);
                return (
                  <s.StyledListItem
                    key={endpoint.route}
                    onClick={() => handleLinkClick(endpoint.spanCodeObjectId)}
                    name={endpointRoute}
                  />
                );
              })}
              <Pagination
                itemsCount={affectedEndpoints.length}
                page={page}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
                withDescription={true}
              />
            </s.List>
          )}
        </ContentContainer>
      }
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      onJiraButtonClick={
        insight.rootCauseSpans.length == 0
          ? handleTicketInfoButtonClick
          : undefined
      }
      onOpenHistogram={insight.spanInfo ? onHistogramButtonClick : undefined}
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
      viewMode={viewMode}
      mainMetric={
        <Tooltip title={durationRangeString}>
          <span>{durationRangeString}</span>
        </Tooltip>
      }
      onDismissalChange={onDismissalChange}
      tooltipBoundaryRef={tooltipBoundaryRef}
    />
  );
};
