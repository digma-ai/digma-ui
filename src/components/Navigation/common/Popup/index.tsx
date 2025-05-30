import * as s from "./styles";
import type { PopupProps } from "./types";

// TODO: move to common
export const Popup = ({ className, height, header, children }: PopupProps) => (
  <s.Container className={className} $height={height}>
    {header && <div>{header}</div>}
    <s.ContentContainer>{children}</s.ContentContainer>
  </s.Container>
);
