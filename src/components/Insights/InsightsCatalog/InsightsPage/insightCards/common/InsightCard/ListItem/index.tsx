import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import { Link } from "../../../../../../../common/v3/Link";
import { Tooltip } from "../../../../../../../common/v3/Tooltip";
import * as s from "./styles";
import type { ListItemProps } from "./types";

const ListItemComponent = (
  { name, onClick, className, endContent }: ListItemProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <s.Container ref={ref} className={className}>
      <s.LinkContainer>
        <Tooltip title={name}>
          <Link onClick={handleClick}>{name}</Link>
        </Tooltip>
        <s.StyledCopyButton text={name} />
      </s.LinkContainer>
      {endContent && (
        <s.EndContentContainer>{endContent}</s.EndContentContainer>
      )}
    </s.Container>
  );
};

export const ListItem = forwardRef(ListItemComponent);
