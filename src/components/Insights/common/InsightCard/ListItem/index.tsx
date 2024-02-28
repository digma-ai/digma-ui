import { MouseEvent } from "react";
import { Tooltip } from "../../../../common/v3/Tooltip";
import * as s from "./styles";
import { ListItemProps } from "./types";

export const ListItem = ({
  name,
  onClick,
  className,
  buttons
}: ListItemProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <s.Container>
      <Tooltip title={name}>
        <s.Link className={className} href={"#"} onClick={handleClick}>
          {name}
        </s.Link>
      </Tooltip>
      {buttons && <s.ButtonsContainer>{buttons}</s.ButtonsContainer>}
    </s.Container>
  );
};
