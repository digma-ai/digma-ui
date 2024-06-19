import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { CardProps } from "./types";

const CardComponent = (
  { className, onClick, header, content, footer }: CardProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <s.Container ref={ref} className={className} onClick={onClick}>
    {header && <s.Header>{header}</s.Header>}
    <s.Content>{content}</s.Content>
    {footer && <s.Footer>{footer}</s.Footer>}
  </s.Container>
);

export const Card = forwardRef(CardComponent);
