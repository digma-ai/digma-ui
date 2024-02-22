import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { InfoCircleIcon } from "../../icons/InfoCircleIcon";
import { AsyncTag } from "../AsyncTag";
import { Tag } from "../Tag";
import { TagType } from "../Tag/types";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { InsightsHeaderProps } from "./types";

export const getTagType = (importance: number): TagType => {
  if (importance === 0) {
    return "default";
  }
  if (importance < 3) {
    return "highSeverity";
  }
  if (importance < 7) {
    return "mediumSeverity";
  }
  return "lowSeverity";
};

export const InsightsHeader = (props: InsightsHeaderProps) => {
  const insightTypeInfo = getInsightTypeInfo(props.insightType);
  const tagType = getTagType(props.importance);

  return (
    <s.Container>
      {insightTypeInfo && (
        <Tag
          type={tagType}
          content={<insightTypeInfo.icon color={"currentColor"} size={16} />}
        ></Tag>
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
      <s.Tags>
        {props.isAsync && <AsyncTag />}
        {props.isNew && <Tag type="success" content="New" />}
        {props.isActive && (
          <s.Active>
            <s.Indicator />
            Active
          </s.Active>
        )}
      </s.Tags>
    </s.Container>
  );
};
