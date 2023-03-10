import { Badge } from "../../../common/Badge";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = (props: EnvironmentTabProps) => {
  const handleClick = () => {
    props.onClick(props.text);
  };

  return (
    <s.Container isSelected={props.isSelected} onClick={handleClick}>
      {props.hasBadge && (
        <s.BadgeContainer>
          <Badge />
        </s.BadgeContainer>
      )}
      {props.text}
    </s.Container>
  );
};
