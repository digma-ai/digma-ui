import { ForwardedRef, MouseEvent, forwardRef } from "react";
import * as s from "./styles";
import { LinkProps } from "./types";

const LinkComponent = (
  props: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (props.onClick) {
      e.preventDefault();
      props.onClick();
    }
  };

  return (
    <s.Link
      ref={ref}
      className={props.className}
      href={props.href || "#"}
      target={props.target}
      rel={props.rel}
      onClick={handleClick}
    >
      {props.children}
    </s.Link>
  );
};

export const Link = forwardRef(LinkComponent);
