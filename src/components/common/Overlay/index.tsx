import type { ForwardedRef, KeyboardEvent } from "react";
import { forwardRef } from "react";
import * as s from "./styles";
import type { OverlayProps } from "./types";

const OverlayComponent = (
  { children, tabIndex, onClose, className }: OverlayProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && onClose) {
      onClose();
    }
  };

  return (
    <s.Overlay
      className={className}
      onKeyDown={handleOverlayKeyDown}
      tabIndex={tabIndex}
      ref={ref}
    >
      {children}
    </s.Overlay>
  );
};

export const Overlay = forwardRef(OverlayComponent);
