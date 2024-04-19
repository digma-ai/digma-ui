import { KeyboardEvent } from "react";
import * as s from "./styles";
import { OverlayProps } from "./types";

export const Overlay = ({ children, tabIndex, onClose }: OverlayProps) => {
  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose && onClose();
    }
  };

  return (
    <s.Overlay onKeyDown={handleOverlayKeyDown} tabIndex={tabIndex}>
      {children}
    </s.Overlay>
  );
};
