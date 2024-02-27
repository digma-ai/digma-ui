import { getInsightTypeInfo } from "../../../../utils/getInsightTypeInfo";
import { InfoCircleIcon } from "../../icons/InfoCircleIcon";
import { AsyncTag } from "../AsyncTag";
import { NewTag } from "../NewTag";
import { Tag } from "../Tag";
import { TagType } from "../Tag/types";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import { InsightHeaderProps } from "./types";

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

export const InsightHeader = (props: InsightHeaderProps) => {
  const insightTypeInfo = getInsightTypeInfo(props.insightType);
  const tagType = getTagType(props.importance);

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
      <s.Tags>
        {props.isAsync && <AsyncTag />}
        {props.isNew && <NewTag />}
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
