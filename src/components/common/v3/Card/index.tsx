import * as s from "./styles";
import { CardProps } from "./types";

export const Card = (props: CardProps) => (
  <s.Container>
    {props.header && <s.Header>{props.header}</s.Header>}
    <s.Content>{props.content}</s.Content>
    {props.footer && <s.Footer>{props.footer}</s.Footer>}
  </s.Container>
);
