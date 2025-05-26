import { Tag } from "../../../../../../../../../common/v3/Tag";
import type { TagType } from "../../../../../../../../../common/v3/Tag/types";
import { getValueLabel } from "./getValueLabel";
import { InsightIconTooltip } from "./InsightIconTooltip";
import * as s from "./styles";
import type { InsightIconProps, ValueLabel } from "./types";

export const getTagType = (valueLabel: ValueLabel): TagType => {
  switch (valueLabel) {
    case "Low":
      return "lowSeverity";
    case "Medium":
      return "mediumSeverity";
    case "High":
      return "highSeverity";
  }
};

export const InsightIcon = ({
  insightTypeInfo,
  severity,
  impact,
  criticality
}: InsightIconProps) => {
  const tagType = getTagType(getValueLabel(criticality));

  return (
    <Tag
      title={<InsightIconTooltip {...{ severity, impact, criticality }} />}
      titlePlacement={"bottom-start"}
      type={tagType}
      content={
        <s.InsightIconContainer>
          <insightTypeInfo.icon color={"currentColor"} size={16} />
        </s.InsightIconContainer>
      }
    />
  );
};
