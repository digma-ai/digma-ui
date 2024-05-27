import { InsightTypeInfo } from "../../../../../../../../../utils/getInsightTypeInfo";
import { roundTo } from "../../../../../../../../../utils/roundTo";
import { Tag } from "../../../../../../../../common/v3/Tag";
import { TagType } from "../../../../../../../../common/v3/Tag/types";
import * as s from "./styles";
import { InsightIconProps } from "./types";

export const getTagType = (criticality: number): TagType => {
  if (criticality < 0.2) {
    return "lowSeverity";
  }

  if (criticality < 0.6) {
    return "mediumSeverity";
  }

  return "highSeverity";
};

export const getTagTitle = (
  insightTypeInfo: InsightTypeInfo | undefined,
  criticality: number
) => {
  const title = `${
    insightTypeInfo ? `${insightTypeInfo.label}\n` : ""
  }Criticality: ${roundTo(criticality * 100, 0)}%`;

  return <s.TagTitle>{title}</s.TagTitle>;
};

export const InsightIcon = ({
  insightTypeInfo,
  criticality
}: InsightIconProps) => {
  const tagTitle = getTagTitle(insightTypeInfo, criticality);
  const tagType = getTagType(criticality);
  return (
    <Tag
      title={tagTitle}
      type={tagType}
      content={
        <s.InsightIconContainer>
          <insightTypeInfo.icon color={"currentColor"} size={16} />
        </s.InsightIconContainer>
      }
    />
  );
};
