import { useRef } from "react";
import { Badge } from "../../../common/Badge";
import * as s from "./styles";
import { EnvironmentTabProps } from "./types";

export const EnvironmentTab = (props: EnvironmentTabProps) => {
  const containerRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView(false);
    }

    props.onClick(props.text);
  };

  return (
    <s.Container
      ref={containerRef}
      isSelected={props.isSelected}
      onClick={handleClick}
    >
      {props.hasBadge && (
        <s.BadgeContainer>
          <Badge />
        </s.BadgeContainer>
      )}
      <s.Label title={props.text}>{props.text}</s.Label>
    </s.Container>
  );
};
