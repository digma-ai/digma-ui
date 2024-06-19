import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { roundTo } from "../../../../../../utils/roundTo";
import { Tooltip } from "../../../../../common/Tooltip";
import { Description, Link } from "../../../../styles";
import { trackingEvents } from "../../../../tracking";
import { InsightCard } from "../../InsightCard";
import { Criticality } from "../common/Criticality";
import { JiraButton } from "../common/JiraButton";
import * as s from "./styles";
import { SpanBottleneckInsightProps } from "./types";

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const SpanBottleneckInsight = ({
  onAssetLinkClick,
  insight,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onRecalculate,
  onRefresh
}: SpanBottleneckInsightProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string,
    event: string
  ) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType: insight.type
      }
    );

    if (onJiraTicketCreate) {
      onJiraTicketCreate(insight, spanCodeObjectId, event);
    }
  };

  return (
    <InsightCard
      data={insight}
      spanInfo={insight.spanInfo}
      content={
        <>
          <Description>
            The following spans are slowing request handling
          </Description>
          <s.Container>
            <s.SpanList>
              {insight.spans.map((span, i) => {
                const spanName = span.spanInfo.displayName;
                const spanCodeObjectId = span.spanInfo.spanCodeObjectId;

                return (
                  <s.Span key={spanCodeObjectId}>
                    <s.SpanDetails>
                      <Tooltip title={spanName}>
                        <s.SpanName>
                          <Link
                            onClick={() =>
                              handleSpanLinkClick(spanCodeObjectId)
                            }
                          >
                            {spanName}
                          </Link>
                        </s.SpanName>
                      </Tooltip>
                      <Description>
                        <Criticality value={span.criticality} />
                        <span>
                          {`Slowing ${roundTo(
                            span.probabilityOfBeingBottleneck * 100,
                            2
                          )}% of the requests (~${getDurationString(
                            span.avgDurationWhenBeingBottleneck
                          )})`}
                        </span>
                      </Description>
                    </s.SpanDetails>
                    <s.ButtonsContainer>
                      <JiraButton
                        onTicketInfoButtonClick={handleTicketInfoButtonClick}
                        spanCodeObjectId={spanCodeObjectId}
                        ticketLink={span.ticketLink}
                        buttonType={"small"}
                        isHintEnabled={isJiraHintEnabled && i === 0}
                      />
                    </s.ButtonsContainer>
                  </s.Span>
                );
              })}
            </s.SpanList>
          </s.Container>
        </>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
    />
  );
};
