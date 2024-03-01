import { getInsightTypeInfo } from "../../../../../utils/getInsightTypeInfo";
import { InfoCircleIcon } from "../../../../common/icons/InfoCircleIcon";
import { WarningTriangleIcon } from "../../../../common/icons/WarningTriangleIcon";
import { NewTag } from "../../../../common/v3/NewTag";
import { Tag } from "../../../../common/v3/Tag";
import { TagType } from "../../../../common/v3/Tag/types";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { AsyncTag } from "./AsyncTag";
import * as s from "./styles";
import { InsightHeaderProps } from "./types";

export const getTagType = (criticality: number): TagType => {
  if (criticality < 0.2) {
    return "lowSeverity";
  }
  if (criticality < 0.6) {
    return "mediumSeverity";
  }
  return "highSeverity";
};

export const InsightHeader = (props: InsightHeaderProps) => {
  const insightTypeInfo = getInsightTypeInfo(props.insightType);
  const tagType = getTagType(props.criticality);

  return (
    <s.Container>
      {insightTypeInfo && (
        <Tag
          type={tagType}
          content={<insightTypeInfo.icon color={"currentColor"} size={16} />}
        />
      )}
      <s.Label>
        {insightTypeInfo?.label}
        {insightTypeInfo?.description && (
          <Tooltip title={<insightTypeInfo.description />}>
            <s.InfoContainer>
              <InfoCircleIcon color={"currentColor"} size={12} />
            </s.InfoContainer>
          </Tooltip>
        )}
      </s.Label>
      <s.BadgeContainer>
        {props.criticality > 0.8 && (
          <Tooltip title={"Critical"}>
            <s.WarningTriangleContainer>
              <WarningTriangleIcon color={"currentColor"} size={12} />
            </s.WarningTriangleContainer>
          </Tooltip>
        )}
        {props.isAsync && <AsyncTag />}
        {props.isNew && <NewTag />}
        {props.isActive && (
          <s.Active>
            <s.Indicator />
            Active
          </s.Active>
        )}
      </s.BadgeContainer>
    </s.Container>
  );
};
