import { useConfigSelector } from "../../../../../../../../../store/config/useConfigSelector";
import { isString } from "../../../../../../../../../typeGuards/isString";
import { formatTimeDistance } from "../../../../../../../../../utils/formatTimeDistance";
import { getInsightTypeInfo } from "../../../../../../../../../utils/getInsightTypeInfo";
import { Link } from "../../../../../../../../common/v3/Link";
import { NewTag } from "../../../../../../../../common/v3/NewTag";
import { Tooltip } from "../../../../../../../../common/v3/Tooltip";
import {
  isEndpointInsight,
  isSpanInsight
} from "../../../../../../../typeGuards";
import type { GenericCodeObjectInsight } from "../../../../../../../types";
import { InsightStatus } from "../../../../../../../types";
import { InsightStatusBadge } from "../../InsightStatusBadge";
import { AsyncTag } from "./AsyncTag";
import { InsightIcon } from "./InsightIcon";
import { InsightStatusTooltipContent } from "./InsightStatusTooltipContent";
import * as s from "./styles";
import type { InsightHeaderProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

const renderInsightStatusTooltipContent = (
  insight: GenericCodeObjectInsight
) => {
  switch (insight.status) {
    case InsightStatus.Active:
    case InsightStatus.PossiblyFixed:
    case InsightStatus.Regression:
      return <InsightStatusTooltipContent insight={insight} />;
  }

  return null;
};

export const InsightHeader = ({
  insight,
  onSpanLinkClick,
  lastUpdateTimer,
  isAsync
}: InsightHeaderProps) => {
  const { scope } = useConfigSelector();

  const insightTypeInfo = getInsightTypeInfo(insight.type, insight.subType);
  const statusTooltipContent = renderInsightStatusTooltipContent(insight);
  const isNew = isString(insight.firstDetected)
    ? Date.now() - new Date(insight.firstDetected).valueOf() < IS_NEW_TIME_LIMIT
    : false;
  const spanInfo =
    isSpanInsight(insight) || isEndpointInsight(insight)
      ? insight.spanInfo
      : undefined;

  const handleSpanLinkClick = () => {
    if (spanInfo) {
      onSpanLinkClick();
    }
  };

  return (
    <s.Container>
      <s.TitleRow>
        {insightTypeInfo && (
          <InsightIcon
            insightTypeInfo={insightTypeInfo}
            severity={insight.severity}
            impact={insight.impact}
            criticality={insight.criticality}
          />
        )}
        <s.Title>
          {insightTypeInfo?.label}
          {lastUpdateTimer && (
            <s.Description>
              Updated:
              <Tooltip title={new Date(lastUpdateTimer).toString()}>
                <span>{formatTimeDistance(lastUpdateTimer)}</span>
              </Tooltip>
            </s.Description>
          )}
        </s.Title>
        <s.BadgeContainer>
          {isAsync && <AsyncTag />}
          {isNew && <NewTag />}
          {insight.status && (
            <Tooltip
              title={statusTooltipContent}
              isDisabled={!statusTooltipContent}
              placement={"bottom-end"}
              fullWidth={true}
            >
              <InsightStatusBadge status={insight.status} />
            </Tooltip>
          )}
        </s.BadgeContainer>
      </s.TitleRow>
      {!scope?.span && spanInfo && (
        <s.SpanInfoRow>
          <Tooltip title={spanInfo.displayName}>
            <Link onClick={handleSpanLinkClick}>{spanInfo.displayName}</Link>
          </Tooltip>
          <s.StyledCopyButton text={spanInfo.displayName} />
        </s.SpanInfoRow>
      )}
    </s.Container>
  );
};
