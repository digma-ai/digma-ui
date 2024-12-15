import { isUndefined } from "../../../typeGuards/isUndefined";
import { Tooltip } from "../Tooltip";
import * as s from "./styles";
import type { TagProps } from "./types";

const renderValue = (value: TagProps["value"]) => {
  switch (typeof value) {
    case "string":
      return <s.TextContainer>{value}</s.TextContainer>;
    case "number":
      return value;
    default:
      return null;
  }
};

/** @deprecated */
export const Tag = ({ title: tagTitle, value, type, icon: Icon }: TagProps) => {
  const title = tagTitle ?? value;
  return (
    <Tooltip title={title}>
      <s.Container $type={type}>
        {Icon && <Icon size={16} color={"currentColor"} />}
        {!isUndefined(value) && (
          <s.ValueContainer>{renderValue(value)}</s.ValueContainer>
        )}
      </s.Container>
    </Tooltip>
  );
};
