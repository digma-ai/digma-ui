import { useContext } from "react";
import { isString } from "../../../../../../../../typeGuards/isString";
import { formatTimeDistance } from "../../../../../../../../utils/formatTimeDistance";
import {
  InsightTypeInfo,
  getInsightTypeInfo
} from "../../../../../../../../utils/getInsightTypeInfo";
import { roundTo } from "../../../../../../../../utils/roundTo";
import { ConfigContext } from "../../../../../../../common/App/ConfigContext";
import { InfoCircleIcon } from "../../../../../../../common/icons/InfoCircleIcon";
import { Link } from "../../../../../../../common/v3/Link";
import { NewTag } from "../../../../../../../common/v3/NewTag";
import { Tag } from "../../../../../../../common/v3/Tag";
import { TagType } from "../../../../../../../common/v3/Tag/types";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import { isEndpointInsight, isSpanInsight } from "../../../../../../typeGuards";
import {
  GenericCodeObjectInsight,
  InsightStatus
} from "../../../../../../types";
import { AsyncTag } from "./AsyncTag";
import { InsightStatusBadge } from "./InsightStatusBadge";
import { InsightStatusTooltipContent } from "./InsightStatusTooltipContent";
import * as s from "./styles";
import { InsightHeaderProps } from "./types";

const IS_NEW_TIME_LIMIT = 1000 * 60 * 10; // in milliseconds

const getTagType = (criticality: number): TagType => {
  if (criticality < 0.2) {
    return "lowSeverity";
  }

  if (criticality < 0.6) {
    return "mediumSeverity";
  }

  return "highSeverity";
};

const getTagTitle = (
  insightTypeInfo: InsightTypeInfo | undefined,
  criticality: number
) => {
  const title = `${
    insightTypeInfo ? `${insightTypeInfo.label}\n` : ""
  }Criticality: ${roundTo(criticality * 100, 0)}%`;

  return <s.TagTitle>{title}</s.TagTitle>;
};

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
  const config = useContext(ConfigContext);

  const insightTypeInfo = getInsightTypeInfo(insight.type);
  const tagType = getTagType(insight.criticality);
  const tagTitle = getTagTitle(insightTypeInfo, insight.criticality);
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
      onSpanLinkClick(spanInfo.spanCodeObjectId);
    }
  };

  return (
    <s.Container>
      <s.TitleRow>
        {insightTypeInfo && (
          <Tooltip title={tagTitle}>
            <Tag
              type={tagType}
              content={
                <insightTypeInfo.icon color={"currentColor"} size={16} />
              }
            />
          </Tooltip>
        )}
        <s.Title>
          {insightTypeInfo?.label}
          {insightTypeInfo?.description && (
            <Tooltip title={<insightTypeInfo.description />}>
              <s.InfoContainer>
                <InfoCircleIcon color={"currentColor"} size={12} />
              </s.InfoContainer>
            </Tooltip>
          )}
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
            >
              <InsightStatusBadge status={insight.status} />
            </Tooltip>
          )}
        </s.BadgeContainer>
      </s.TitleRow>
      {!config.scope?.span && spanInfo && (
        <s.SpanInfoRow>
          <Tooltip title={spanInfo.displayName}>
            <Link onClick={handleSpanLinkClick}>{spanInfo.displayName}</Link>
          </Tooltip>
        </s.SpanInfoRow>
      )}
    </s.Container>
  );
};
