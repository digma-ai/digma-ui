import { isString } from "../../../../typeGuards/isString";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { Tooltip } from "../../Tooltip";
import * as s from "./styles";
import { TagProps } from "./types";

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

export const Tag = (props: TagProps) => {
  const title = isString(props.title) ? props.title : props.value;
  return (
    <Tooltip title={title}>
      <s.Container $type={props.type}>
        {props.icon && <props.icon size={16} color={"currentColor"} />}
        {!isUndefined(props.value) && (
          <s.ValueContainer>{renderValue(props.value)}</s.ValueContainer>
        )}
      </s.Container>
    </Tooltip>
  );
};
