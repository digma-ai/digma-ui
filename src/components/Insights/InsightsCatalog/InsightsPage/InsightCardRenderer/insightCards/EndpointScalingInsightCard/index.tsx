import { useConfigSelector } from "../../../../../../../store/config/useConfigSelector";
import type { InsightType } from "../../../../../../../types";
import { getDurationString } from "../../../../../../../utils/getDurationString";
import { TraceIcon } from "../../../../../../common/icons/12px/TraceIcon";
import { Button } from "../../../../../../common/v3/Button";
import { JiraButton } from "../../../../../../common/v3/JiraButton";
import { Tooltip } from "../../../../../../common/v3/Tooltip";
import type { SourceSpanInfo, Trace } from "../../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ListItem } from "../common/InsightCard/ListItem";
import { AssetLink, ContentContainer, Description, Details } from "../styles";
import * as s from "./styles";
import type { EndpointScalingInsightCardProps } from "./types";

export const EndpointScalingInsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onHistogramButtonClick,
  onGoToSpan,
  isMarkAsReadButtonEnabled,
  viewMode,
  onDismissalChange,
  tooltipBoundaryRef
}: EndpointScalingInsightCardProps) => {
  const { isJaegerEnabled } = useConfigSelector();

  const handleLinkClick = (spanCodeObjectId: string) => () => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTraceButtonClick =
    (trace: Trace, insightType: InsightType, spanCodeObjectId: string) =>
    () => {
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

  const renderRootCause = (sourceSpanInfo: SourceSpanInfo) => {
    const spanName = sourceSpanInfo.displayName;
    const traceId = sourceSpanInfo.sampleTraceId;
    const spanCodeObjectId = sourceSpanInfo.spanCodeObjectId;

    const buttons = [
      <JiraButton
        key={"view-ticket-info"}
        onTicketInfoOpen={handleTicketInfoButtonClick}
        spanCodeObjectId={sourceSpanInfo.spanCodeObjectId}
        ticketLink={insight.ticketLink}
        isHintEnabled={isJiraHintEnabled}
        insightType={insight.type}
        type={"icon"}
        boundaryRef={tooltipBoundaryRef}
      />
    ];

    if (isJaegerEnabled && traceId) {
      buttons.push(
        <Button
          key={"trace"}
          icon={TraceIcon}
          onClick={handleTraceButtonClick(
            {
              name: spanName,
              id: traceId
            },
            insight.type,
            spanCodeObjectId
          )}
        />
      );
    }

    return (
      <Details>
        <Description>Caused by</Description>
        <ListItem
          key={spanCodeObjectId}
          name={spanName}
          onClick={handleLinkClick(spanCodeObjectId)}
          endContent={buttons}
        />
      </Details>
    );
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
          {insight.issueLocation === "Span" && insight.sourceSpanInfo && (
            <Details>
              <Description>Asset</Description>
              <AssetLink
                name={insight.sourceSpanInfo.displayName}
                onClick={handleLinkClick(
                  insight.sourceSpanInfo.spanCodeObjectId
                )}
              />
            </Details>
          )}
          <ColumnsContainer>
            <KeyValue label={"Tested concurrency"}>
              {insight.maxConcurrency}
            </KeyValue>
            <KeyValue
              label={"Duration"}
              info={"The execution time range from minimal to maximum duration"}
            >
              {durationRangeString}
            </KeyValue>
          </ColumnsContainer>
          {insight.issueLocation === "SpanRootCause" &&
            insight.sourceSpanInfo &&
            renderRootCause(insight.sourceSpanInfo)}
        </ContentContainer>
      }
      jiraTicketInfo={{
        ticketLink: insight.ticketLink,
        isHintEnabled: isJiraHintEnabled
      }}
      onJiraButtonClick={
        insight.issueLocation !== "SpanRootCause"
          ? handleTicketInfoButtonClick
          : undefined
      }
      onOpenHistogram={insight.spanInfo ? onHistogramButtonClick : undefined}
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
