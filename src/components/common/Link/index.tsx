import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef } from "react";
import * as s from "./styles";
import type { LinkProps } from "./types";

const LinkComponent = (
  { onClick, href, className, target, rel, children }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      if (!href) {
        e.preventDefault();
      }
      onClick(e);
    }
  };

  return (
    <s.Link
      ref={ref}
      className={className}
      href={href ?? "#"}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </s.Link>
  );
};

export const Link = forwardRef(LinkComponent);
