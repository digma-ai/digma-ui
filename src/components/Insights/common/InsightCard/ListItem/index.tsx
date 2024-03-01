import { ForwardedRef, MouseEvent, forwardRef } from "react";
import { Tooltip } from "../../../../common/v3/Tooltip";
import * as s from "./styles";
import { ListItemProps } from "./types";

const ListItemComponent = (
  { name, onClick, className, buttons }: ListItemProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <s.Container ref={ref}>
      <Tooltip title={name}>
        <s.Link className={className} href={"#"} onClick={handleClick}>
          {name}
        </s.Link>
      </Tooltip>
      {buttons && <s.ButtonsContainer>{buttons}</s.ButtonsContainer>}
    </s.Container>
  );
};

export const ListItem = forwardRef(ListItemComponent);
