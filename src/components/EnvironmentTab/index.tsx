import { Badge } from "../common/Badge";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = (props: EnvironmentTabProps) => {
  const handleClick = () => {
    props.onClick(props.text);
  };

  return (
    <s.BorderContainer isSelected={props.isSelected}>
      <s.Container isSelected={props.isSelected} onClick={handleClick}>
        {props.hasBadge && <Badge />}
        {props.text}
      </s.Container>
    </s.BorderContainer>
  );
};
