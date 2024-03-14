import { useContext } from "react";
import { formatTimeDistance } from "../../../../../utils/formatTimeDistance";
import {
  InsightTypeInfo,
  getInsightTypeInfo
} from "../../../../../utils/getInsightTypeInfo";
import { roundTo } from "../../../../../utils/roundTo";
import { ConfigContext } from "../../../../common/App/ConfigContext";
import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { Link } from "../../../../common/v3/Link";
import { NewTag } from "../../../../common/v3/NewTag";
import { Tag } from "../../../../common/v3/Tag";
import { TagType } from "../../../../common/v3/Tag/types";
import { Tooltip } from "../../../../common/v3/Tooltip";
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

export const InsightHeader = (props: InsightHeaderProps) => {
  const config = useContext(ConfigContext);

  const insightTypeInfo = getInsightTypeInfo(props.insightType);
  const tagType = getTagType(props.criticality);
  const tagTitle = getTagTitle(insightTypeInfo, props.criticality);

  const handleSpanLinkClick = () => {
    if (props.spanInfo) {
      props.onSpanLinkClick(props.spanInfo.spanCodeObjectId);
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
          {props.lastUpdateTimer && (
            <s.Description>
              Updated:
              <Tooltip title={new Date(props.lastUpdateTimer).toString()}>
                <span>{formatTimeDistance(props.lastUpdateTimer)}</span>
              </Tooltip>
            </s.Description>
          )}
        </s.Title>
        <s.BadgeContainer>
          {props.isAsync && <AsyncTag />}
          {props.isNew && <NewTag />}
          {props.status && <InsightStatusBadge status={props.status} />}
        </s.BadgeContainer>
      </s.TitleRow>
      {!config.scope?.span && props.spanInfo && (
        <s.SpanInfoRow>
          <Tooltip title={props.spanInfo.displayName}>
            <Link onClick={handleSpanLinkClick}>
              {props.spanInfo.displayName}
            </Link>
          </Tooltip>
        </s.SpanInfoRow>
      )}
    </s.Container>
  );
};
