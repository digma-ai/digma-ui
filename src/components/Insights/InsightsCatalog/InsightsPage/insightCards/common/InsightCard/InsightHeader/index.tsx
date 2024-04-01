import { useContext } from "react";
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
import { AsyncTag } from "./AsyncTag";
import { InsightStatusBadge } from "./InsightStatusBadge";
import * as s from "./styles";
import { InsightHeaderProps } from "./types";

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

export const InsightHeader = ({
  insightType,
  criticality,
  spanInfo,
  onSpanLinkClick,
  lastUpdateTimer,
  isAsync,
  isNew,
  status
}: InsightHeaderProps) => {
  const config = useContext(ConfigContext);

  const insightTypeInfo = getInsightTypeInfo(insightType);
  const tagType = getTagType(criticality);
  const tagTitle = getTagTitle(insightTypeInfo, criticality);

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
          {status && <InsightStatusBadge status={status} />}
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
