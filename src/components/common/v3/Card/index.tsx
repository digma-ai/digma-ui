import { ForwardedRef, forwardRef } from "react";
import * as s from "./styles";
import { CardProps } from "./types";

const CardComponent = (props: CardProps, ref: ForwardedRef<HTMLDivElement>) => (
  <s.Container ref={ref} className={props.className}>
    {props.header && <s.Header>{props.header}</s.Header>}
    <s.Content>{props.content}</s.Content>
    {props.footer && <s.Footer>{props.footer}</s.Footer>}
  </s.Container>
);

export const Card = forwardRef(CardComponent);
